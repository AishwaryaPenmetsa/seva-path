// ============================================================
// SevaPath — Local-Only Document Storage via IndexedDB
// Files never leave the browser. No network calls. Max 5 MB.
// ============================================================

const DB_NAME = 'sevapath_local_documents_db';
const STORE_NAME = 'user_documents';
const DB_VERSION = 1;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export interface StoredDocumentFile {
  id: string; // key: `${benefitId}_${documentId}`
  benefitId: string;
  documentId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  dataUrl: string; // base64 representation for preview
  uploadedAt: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDocumentFile(
  benefitId: string,
  documentId: string,
  file: File
): Promise<StoredDocumentFile> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('File exceeds maximum allowed size of 5 MB.');
  }

  const isAllowedType = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) ||
    file.name.toLowerCase().endsWith('.pdf') ||
    file.name.toLowerCase().endsWith('.jpg') ||
    file.name.toLowerCase().endsWith('.jpeg') ||
    file.name.toLowerCase().endsWith('.png');

  if (!isAllowedType) {
    throw new Error('Only PDF, JPG, and PNG files are allowed.');
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const record: StoredDocumentFile = {
    id: `${benefitId}_${documentId}`,
    benefitId,
    documentId,
    fileName: file.name,
    fileType: file.type || 'application/octet-stream',
    fileSize: file.size,
    dataUrl,
    uploadedAt: new Date().toISOString(),
  };

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putReq = store.put(record);

    putReq.onsuccess = () => resolve(record);
    putReq.onerror = () => reject(putReq.error);
  });
}

export async function getDocumentFile(
  benefitId: string,
  documentId: string
): Promise<StoredDocumentFile | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(`${benefitId}_${documentId}`);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function getAllDocumentFilesForBenefit(
  benefitId: string
): Promise<StoredDocumentFile[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const all: StoredDocumentFile[] = req.result || [];
        resolve(all.filter((item) => item.benefitId === benefitId));
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export async function removeDocumentFile(
  benefitId: string,
  documentId: string
): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(`${benefitId}_${documentId}`);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore errors on delete
  }
}

export async function clearAllDocumentFiles(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore errors on clear
  }
}

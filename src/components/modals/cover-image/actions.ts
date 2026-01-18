import { UploadFile } from '@/components/general/dropzone/dropzone';

export async function uploadFile(file: UploadFile) {
  const res = await fetch('/api/s3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: file.key,
      filename: file.file.name,
      contentType: file.file.type,
      size: file.file.size,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error('[upload] failed to get presigned URL', {
      status: res.status,
      error: data,
    });

    throw new Error(
      `Failed to get upload URL${data?.error ? `: ${data.error}` : ''}`
    );
  }

  const uploadRes = await fetch(data.presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.file.type },
    body: file.file,
  });

  if (!uploadRes.ok) {
    console.error('[upload] S3 upload failed', {
      status: uploadRes.status,
      statusText: uploadRes.statusText,
    });

    throw new Error(`Failed to upload file to S3 (${uploadRes.status})`);
  }

  return file.key;
}

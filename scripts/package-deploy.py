import os
import sys
import zipfile
import shutil

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
DOWNLOAD_DIR = os.path.join(PUBLIC_DIR, 'download')

os.makedirs(DOWNLOAD_DIR, exist_ok=True)

# 1. Ensure dist/_redirects exists
dist_redirects = os.path.join(DIST_DIR, '_redirects')
if not os.path.exists(dist_redirects):
    with open(dist_redirects, 'w') as f:
        f.write('/*    /index.html   200\n')
    print("Created dist/_redirects")

# 2. Package netlify-deploy.zip (contents of dist/ directly at root)
netlify_zip_path = os.path.join(ROOT_DIR, 'netlify-deploy.zip')
print(f"Creating {netlify_zip_path} from {DIST_DIR}...")

with zipfile.ZipFile(netlify_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(DIST_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            # Calculate path relative to DIST_DIR so files are at root of ZIP
            arcname = os.path.relpath(file_path, DIST_DIR)
            # Skip any existing zip files that might be in dist
            if arcname.endswith('.zip'):
                continue
            zipf.write(file_path, arcname)

print(f"✅ netlify-deploy.zip created: {os.path.getsize(netlify_zip_path):,} bytes")

# Verify netlify-deploy.zip
with zipfile.ZipFile(netlify_zip_path, 'r') as zipf:
    names = zipf.namelist()
    has_index = 'index.html' in names
    has_redirects = '_redirects' in names
    print(f"  Total files in zip: {len(names)}")
    print(f"  Contains index.html at root: {has_index}")
    print(f"  Contains _redirects at root: {has_redirects}")
    if not has_index or not has_redirects:
        print("❌ Error: Missing essential Netlify files at ZIP root!")
        sys.exit(1)

# 3. Package project-source.zip (full source code, excluding build artifacts and node_modules)
source_zip_path = os.path.join(ROOT_DIR, 'project-source.zip')
print(f"Creating {source_zip_path}...")

EXCLUDE_DIRS = {'node_modules', 'dist', 'dist-standalone', '.git', '.cache', '__pycache__', '.temp'}
EXCLUDE_EXTS = {'.zip', '.log', '.tmp'}

with zipfile.ZipFile(source_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(ROOT_DIR):
        # Filter directories in-place
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
        for file in files:
            _, ext = os.path.splitext(file)
            if ext in EXCLUDE_EXTS:
                continue
            if file in {'netlify-deploy.zip', 'project-source.zip'}:
                continue
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, ROOT_DIR)
            zipf.write(file_path, arcname)

print(f"✅ project-source.zip created: {os.path.getsize(source_zip_path):,} bytes")

# 4. Copy both zips to public and public/download for serving
for zip_file in [netlify_zip_path, source_zip_path]:
    fname = os.path.basename(zip_file)
    shutil.copy2(zip_file, os.path.join(PUBLIC_DIR, fname))
    shutil.copy2(zip_file, os.path.join(DOWNLOAD_DIR, fname))
    # Also if dist exists, copy to dist/download
    dist_download = os.path.join(DIST_DIR, 'download')
    os.makedirs(dist_download, exist_ok=True)
    shutil.copy2(zip_file, os.path.join(dist_download, fname))
    shutil.copy2(zip_file, os.path.join(DIST_DIR, fname))

print("✅ Deployment and source ZIPs copied to public and dist download directories.")

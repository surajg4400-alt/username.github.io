Render Aura — Netlify-ready ZIP


Contents:
- public/index.html    (static site)
- netlify/functions/chat.js  (Netlify Function - serverless proxy)
- package.json         (declares node-fetch dependency for functions)

How to deploy on Netlify (Full Site Deploy):
1. Go to Netlify Dashboard -> New site -> Upload a folder
2. Upload this ZIP file (or the extracted folder). Netlify will detect functions in netlify/functions and install dependencies from package.json.
3. In Site settings -> Build & deploy -> Environment -> Add variable GENERATIVE_API_KEY with your key. Also add GENERATIVE_MODEL if needed.
4. Deploy. The function will be available at /.netlify/functions/chat

Important: Do NOT use Netlify Drop (drag-and-drop) for functions. Use 'Upload a folder' or connect via Git.

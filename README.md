## Gather
Gather is an all-in-one event planning application. From deciding on a date to splitting expenses, gather meets all of your event planning needs. No need to download several apps! 

### 💻 Tech Stack
- Next.js
- React
- Tailwind CSS
- Supabase
- Postman

### ✅ To do
- [ ] date polling feature
- [ ] deploy

### ▶️ Running Locally
Clone the repo and navigate to the directory
```
git clone https://github.com/jappun/gather.git
```
Navigate to the directory (the exact commands will differ based on where you downloaded to)
```
cd path/to/gather # adjust based on download location
```
Install dependencies
```
npm instsall
```
Run the server
```
npm run dev
````
You're running the web app. Open http://localhost:3000/ in your browser! 

### ⚠️ NOTE: You will see errors when you try to interact with the UI
This is expected! Your local copy won't have access to my Supabase project. You're welcome to set up your own Supabase project. Then put your project keys into a .env file that  looks like this:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
You'll also need to set up your tables correctly as the program expects. If you want the database schema, email me at jpdhillon07@gmail.com


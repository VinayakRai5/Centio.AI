# Centio.AI 💻

**Alpha** AI assistant app that combines AI features with traditional productivity. Key features:

- **Chat** - Regular and Assistant chat modes:
  - Regular Chat: Create multiple chats, choose saved or temporary (throwaway) chat when you create it.
  - Assistant Chat: AI makes a list of tasks from the request and performs them, including web searches, adding to-do entries, creating docs, and responding.

- **Researcher** - In-depth research on topics:
  - Generate an initial list of research topics.
  - Configure max depth, max research time, web search, and other options.
  - Generate a doc with research on the topic, including links used.

- **Docs (RAG)** - Summarize and respond to documents:
  - Upload PDFs (up to 5mb) or plain text/markdown files.
  - Enable Docs chat mode to find relevant content and respond.

- **Stream** - Track actions and categorize chats:
  - List of actions the assistant has performed.
  - Add one-shot chats to the stream for categorization and summarization.

- **To Do** - Basic to-do list:
  - Create, edit, or remove entries.
  - AI can create entries for you.

**Warnings**:

- Alpha software with bugs and issues.
- Some features may consume many tokens, be cautious with paid APIs.

**Setup**:

1. Clone repo and install dependencies.
2. Edit `config.toml` with API details (openai_base_url and openai_api_key).
3. Run `./start.sh` to start the app.

**What's Next?**

- Improve Researcher function.
- Experiment with Assistant Modes.
- Integrate with personal data sources (e.g., email, calendar).
- Add more functions.
- Develop fine-tuned models.

**Developers**:

- Add your own function in `functions.py`.
- API-first, connect with OpenAI client.
- Use "virtual" models and RAG.
- Contribute to our platform and help shape its future.

**Help**:

Post issues or ask questions in the community. We're here to support you as we work together to make Centio.AI a daily driver for productivity.

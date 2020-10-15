# Rethink Plaintext Editing

This is our frontend coding challenge. It gives us a chance to see your abilities and how you approach problems. It is designed to give you unlimited creative freedom as you develop a solution. Feel free to use any packages/tools/etc. you'd like to edit text as elegantly as possible. There are a variety of different file types to experiment with as you see fit.

To run the challenge:

- FORK this repo
- Download forked repo and run `npm install && npm run dev`
- Open `localhost:3000` in your browser
- Enjoy

Once complete, please email us a link to your forked repo with clean, tested code. We will use Chrome to run it.

- Rethink Engineering

### Components Added

1. PlaintextEditor: This is a simple plain text editor using textarea, since the plain text needs.

2. PlaintextPreview: This is a simple plain text previewer to view the content in the .txt files.

3. MarkdownEditor: This component is a special markdown editor component built using `react-simplemde-editor`. It allows elegant options to edit the markdown file. Furthermore, one can simultaneously edit and preview the doc.

4. MarkdownEditor: This is a simple markdown previewer build using `reeact-markdown` package to view the content in the .md files.

5. CodeEditor: This editor provides rich features of the monaco editor which is the backbone for the most coveted editor vscode. Dark and light modes of this editor is a special attraction. Used `@monaco-editor/react` package that supports more that 20 coding languages.

6. CodePreviewer: Built this component using `react-syntax-highlighter` package is used to highlight the syntax in the code file. And supports more that 20 languages.

### Fuctionality added

1. Edit: To edit the file.

2. Save: To save and persist you work.

3. Delete: To delete the file.

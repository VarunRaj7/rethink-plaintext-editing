import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import path from 'path';
import classNames from 'classnames';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import dynamic from 'next/dynamic';

import { listFiles } from '../files';

import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

import css from './style.module.css';
import { CodeLanguages } from './CodeLanguages';

// Import the components dynamically
const MarkdownEditor = dynamic(
  () => {
    return import('../components/MarkdownEditor');
  },
  { ssr: false }
);
const CodeEditor = dynamic(
  () => {
    return import('../components/CodeEditor');
  },
  { ssr: false }
);
const CodePreviewer = dynamic(
  () => {
    return import('../components/CodePreviewer');
  },
  { ssr: false }
);

const PlaintextEditor = dynamic(
  () => {
    return import('../components/PlaintextEditor');
  },
  { ssr: false }
);

const MarkdownPreviewer = dynamic(
  () => {
    return import('../components/MarkdownPreviewer');
  },
  { ssr: false }
);
const PlaintextPreviewer = dynamic(
  () => {
    return import('../components/PlaintextPreviewer');
  },
  { ssr: false }
);

const TYPE_TO_ICON = {
  'text/plain': IconPlaintextSVG,
  'text/markdown': IconMarkdownSVG,
  'text/javascript': IconJavaScriptSVG,
  'application/json': IconJSONSVG
};

function FilesTable({ files, activeFile, setActiveFile, setEditState }) {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ''
              )}
              onClick={() => {
                setActiveFile(file);
                setEditState(false);
              }}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func,
  setEditState: PropTypes.func
};

function Loader({
  file,
  editState,
  setEditState,
  write,
  Editor,
  FilePreviewer,
  del,
  ftype
}) {
  const [value, setValue] = useState('');

  // loading the files from the local storage or file.js
  useEffect(() => {
    (async () => {
      const f = await localStorage.getItem(file.name);
      setValue(f ? f : await file.text());
    })();
  }, [file]);

  // handling the edit state of the editor
  function handleEdit(newState = !editState) {
    setEditState(newState);
  }

  // handing the value in the editor
  function handleValue(val) {
    console.log(val);
    setValue(val);
  }

  // saving the edits in the local storage
  // to persist the save on reload using write function
  function handleOnSave() {
    console.log('Saving..');
    setValue(value.trim());
    write(value.trim());
    handleEdit(false);
  }

  return (
    <div className={css.preview}>
      <div className={css.title}>
        {path.basename(file.name)}{' '}
        <span className={css.btns}>
          <IconButton aria-label="Edit" size="small" onClick={handleEdit}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Save"
            size="small"
            onClick={() => {
              handleOnSave();
            }}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Delete" size="small" onClick={del}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </span>
      </div>
      {!editState && <FilePreviewer value={value} ftype={ftype} />}
      {editState && (
        <Editor value={value} handleValue={handleValue} ftype={ftype} />
      )}
    </div>
  );
}

Loader.propTypes = {
  file: PropTypes.object,
  editState: PropTypes.bool,
  setEditState: PropTypes.func,
  write: PropTypes.func,
  Editor: PropTypes.object,
  FilePreviewer: PropTypes.object,
  del: PropTypes.func,
  ftype: PropTypes.string
};

const REGISTERED_EDITORS = {
  'text/plain': PlaintextEditor,
  'text/markdown': MarkdownEditor,
  'text/code': CodeEditor
};

const REGISTERED_PREVIEWERS = {
  'text/plain': PlaintextPreviewer,
  'text/markdown': MarkdownPreviewer,
  'text/code': CodePreviewer
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  // saves the value of the file
  //  to the local storage
  const write = async value => {
    let ftype = null;
    let ind = null;

    files.map((f, i) => {
      if (f.name === activeFile.name) {
        ftype = f.type;
        ind = i;
      }
    });

    files[ind] = new File([value], activeFile.name, {
      type: ftype,
      lastModified: new Date()
    });
    setFiles(files);
    localStorage.setItem(activeFile.name, await files[ind].text());
  };

  // deleting the file
  const del = () => {
    let ind = null;

    files.map((f, i) => {
      if (f.name === activeFile.name) {
        ind = i;
      }
    });

    console.log(ind);

    files.splice(ind, 1);

    localStorage.removeItem(activeFile.name);
    setFiles(files);
    setActiveFile(null);
  };

  const filetype = activeFile ? activeFile.type.split('/')[1] : null;
  var Editor = null;
  var FilePreviewer = null;

  // choosing the editor or previewer
  if (activeFile) {
    if (CodeLanguages.includes(filetype)) {
      Editor = REGISTERED_EDITORS['text/code'];
      FilePreviewer = REGISTERED_PREVIEWERS['text/code'];
    } else {
      Editor = REGISTERED_EDITORS[activeFile.type];
      FilePreviewer = REGISTERED_PREVIEWERS[activeFile.type];
    }
  } else {
    Editor = REGISTERED_EDITORS['text/plain'];
    FilePreviewer = REGISTERED_PREVIEWERS['text/plain'];
  }

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Seasoning Plaintext</h1>
          <div className={css.description}>
            Let{"'"}s have fun with files and JavaScript. What could be more fun
            than rendering and editing plaintext? Not much, as it turns out.
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          setEditState={setEditState}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://v3.rethink.software/jobs">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email us at jobs@rethink.software
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {
              <Loader
                file={activeFile}
                editState={editState}
                setEditState={setEditState}
                write={write}
                Editor={Editor}
                FilePreviewer={FilePreviewer}
                del={del}
                ftype={filetype}
              />
            }
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFilesChallenge;

// {Editor && <Editor file={activeFile} write={write} />}

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import path from 'path';
import classNames from 'classnames';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
// import { TextareaAutosize } from '@material-ui/core';

import { listFiles } from '../files';

// Used below, these need to be registered
import MarkdownEditor from '../components/MarkdownEditor';
import PlaintextEditor from '../components/PlaintextEditor';

// Used below, these need to be registered
import MarkdownPreviewer from '../components/MarkdownPreviewer';
import PlaintextPreviewer from '../components/PlaintextPreviewer';

import IconPlaintextSVG from '../public/icon-plaintext.svg';
import IconMarkdownSVG from '../public/icon-markdown.svg';
import IconJavaScriptSVG from '../public/icon-javascript.svg';
import IconJSONSVG from '../public/icon-json.svg';

import css from './style.module.css';

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
  setActiveFile: PropTypes.func
};

function Previewer({ file, editState, setEditState, write, Editor }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  function handleEdit(newState = !editState) {
    setEditState(newState);
  }

  function handleValue(val) {
    setValue(val);
  }

  function handleTextAreaOnSave() {
    setValue(value.trim());
    write(file.name, value.trim());
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
              handleTextAreaOnSave();
            }}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Delete" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </span>
      </div>
      <div className={editState === false ? css.content : css.edit}>
        {!editState && value}
        {editState && <Editor value={value} handleValue={handleValue} />}
      </div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  'text/plain': PlaintextEditor,
  'text/markdown': MarkdownEditor
};

const REGISTERED_PREVIEWERS = {
  'text/plain': PlaintextPreviewer,
  'text/markdown': MarkdownPreviewer
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [editState, setEditState] = useState(false);

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  const write = (fileName, value) => {
    let ftype = null;
    let ind = null;

    files.map((f, i) => {
      if (f.name === fileName) {
        ftype = f.type;
        ind = i;
      }
    });

    files[ind] = new File([value], fileName, {
      type: ftype,
      lastModified: new Date()
    });
  };

  // const del = fileName => {
  //   let ind = null;

  //   files.map((f, i) => {
  //     if (f.name === fileName) {
  //       ind = i;
  //     }
  //   });

  //   files.splice(ind, 1);

  //   console.log(files);

  //   setFiles(files);
  // };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;
  const FilePreviewer = activeFile
    ? REGISTERED_PREVIEWERS[activeFile.type]
    : null;

  console.log(Editor);

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
              <Previewer
                file={activeFile}
                editState={editState}
                setEditState={setEditState}
                write={write}
                Editor={Editor}
                FilePreviewer={FilePreviewer}
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

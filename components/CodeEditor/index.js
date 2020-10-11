import React from 'react';
import PropTypes from 'prop-types';
import { ControlledEditor } from '@monaco-editor/react';
import { StageSpinner } from 'react-spinners-kit';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import css from './style.module.css';

function CodeEditor({ value, handleValue, ftype }) {
  const [codeTheme, setCodeTheme] = React.useState({ dark: false });

  const AntSwitch = withStyles(theme => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex'
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.dark
        }
      }
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none'
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white
    },
    checked: {}
  }))(Switch);

  function handleCodeThemeChange(e) {
    console.log(e.target.value);
    setCodeTheme({ dark: e.target.checked });
  }

  return (
    <div className={codeTheme.dark ? css.darkeditor : css.editor}>
      <div className={css.switchbtn}>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item className={codeTheme.dark ? css.darktxt : css.txt}>
              Light
            </Grid>
            <Grid item>
              <AntSwitch
                checked={codeTheme.dark}
                onChange={handleCodeThemeChange}
                name="codeTheme"
              />
            </Grid>
            <Grid item className={codeTheme.dark ? css.darktxt : css.txt}>
              Dark
            </Grid>
          </Grid>
        </Typography>
      </div>
      <ControlledEditor
        width="100%"
        height="70vh"
        theme={!codeTheme.dark ? 'light' : 'dark'}
        language={ftype}
        value={value}
        onChange={(ev, val) => handleValue(val)}
        loading={<StageSpinner />}
        className={css.ceditor}
        options={{
          wordWrap: 'on'
        }}
      />
    </div>
  );
}

CodeEditor.propTypes = {
  value: PropTypes.object,
  handleValue: PropTypes.func,
  ftype: PropTypes.string
};

export default CodeEditor;

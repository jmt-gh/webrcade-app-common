import React from "react";
import { ArrowBackWhiteImage, PlayArrowWhiteImage } from "../../../images";
import { ImageButton } from "../../components/image-button";
import { Resources, TEXT_IDS } from "../../../resources";
import { Screen } from '../../components/screen'
import { WebrcadeContext } from "../../context/webrcadecontext.js"

import styles from './style.scss'

export class PauseScreen extends Screen {
  constructor() {
    super();

    this.exitButtonRef = React.createRef();
    this.resumeButtonRef = React.createRef();

    this.focusGrid.setComponents([
      [this.exitButtonRef, this.resumeButtonRef]
    ]);
  }

  focus() {
    const { resumeButtonRef } = this;

    if (this.gamepadNotifier.padCount > 0) {
      if (resumeButtonRef && resumeButtonRef.current) {
        resumeButtonRef.current.focus();
      }
    }
  }

  render() {
    const { exitButtonRef, focusGrid, resumeButtonRef, screenContext,
      screenStyles } = this;
    const { appProps, exitCallback, isEditor } = this.props;

    return (
      <WebrcadeContext.Provider value={screenContext}>
        <div className={screenStyles['screen-transparency']} />
        <div className={styles['pause-screen']}>
          <div className={styles['pause-screen-inner'] + " " + screenStyles.screen}>
            <div className={styles['pause-screen-inner-info']}>
              <div className={styles['pause-screen-inner-info-title']}>{appProps.title}</div>
              <div className={styles['pause-screen-inner-info-app']}>{appProps.app}</div>
            </div>
            <div className={styles['pause-screen-inner-buttons']}>
              <div className={styles['pause-screen-inner-buttons-container']}>
                <ImageButton
                  className={styles["pause-screen-image-button"]}
                  imgSrc={ArrowBackWhiteImage}
                  ref={exitButtonRef}
                  label={Resources.getText( isEditor ?
                    TEXT_IDS.RETURN_TO_EDITOR : TEXT_IDS.RETURN_TO_BROWSE)}
                  onPad={e => focusGrid.moveFocus(e.type, exitButtonRef)}
                  onClick={() => {if (exitCallback) exitCallback()}}
                />
                <ImageButton
                  className={styles["pause-screen-image-button"]}
                  imgSrc={PlayArrowWhiteImage}
                  ref={this.resumeButtonRef}
                  label={Resources.getText(TEXT_IDS.RESUME)}
                  onPad={e => focusGrid.moveFocus(e.type, resumeButtonRef)}
                  onClick={() => this.close()}
                />
              </div>
            </div>
          </div>
        </div>
      </WebrcadeContext.Provider>
    );
  }
}


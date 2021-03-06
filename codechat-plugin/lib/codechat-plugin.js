'use babel';

// *********** CodeChat Preview Plugin *********************************
//
// *********** Created by Jack Betbeze and Christian Bush **************
// *********** https://github.com/cbb330/CodeChat-TextEditor ***********
//
//
// *********** log-viewer.js *******************************************
//
// *** Initializes the entire plugin
//
// *********************************************************************

import CodechatPluginView from './codechat-plugin-view';
import { CompositeDisposable, Disposable } from 'atom';



export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable(


      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://codechat-plugin') {
          return new CodechatPluginView();
        }
      }),


      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'codechat-plugin:toggle': () => this.toggle()
      }),

      // Destroy any ActiveEditorInfoViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof LogViewerView) {
            item.destroy();
          }
        });
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    atom.workspace.toggle('atom://codechat-plugin');
  },

  deserializeCodechatPluginView(serialized) {
    return new CodechatPluginView();
  }

};

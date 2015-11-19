'use strict'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';
import CGBand from './components/CGBand';
import {Config,Video} from 'youtube-client-wrapper';

let bootYoutubeClient = ()=>{
    return Config.set({
                apiKey: 'AIzaSyB8_0tIV6QuSA5Qb1zx3kXW8UAB-cATQXU'
            })
            .boot();
}

let currentPlayListIds = [];
let videos = new Map();
let externalList = ['Katy Perry - This Is How We Do','icona pop - emergency','rusko - woo boost'];
class App extends Component {
    constructor(...props){
        super(...props);
        bootYoutubeClient()
            .then(() => {
                this._collectVideosId();
            });

        this.state = {
            loading: true,
            playlist: currentPlayListIds,
            showCGBand: false,
            currentVideoTitle: ''
        };
    }

    render() {
        let content = this.state.loading? this._getLoadingComponent() : this._getYoutubeVideo();
        return ( content );
    }

    _collectVideosId() {
        if( externalList.length == 0 ){
            this.setState({
                loading: false,
                playlist: currentPlayListIds,
                showCGBand: false,
                currentVideoTitle: videos.get(currentPlayListIds[0]).title
            });
        }else{
            let videoTitle = externalList.shift();
            Video.where(videoTitle)
            .then(page => {
                currentPlayListIds.push( page.firstElement().id );
                videos.set( page.firstElement().id, page.firstElement());
                this._collectVideosId();
            });
        }
    }

    _getLoadingComponent() {
        return (
            <div className="AppLoading"><h1>loading...</h1></div>
        );
    }

    _getYoutubeVideo() {
        return (
            <div>
                <Player className="playerContainer" 
                    list={this.state.playlist}
                    onReady={this._onReadyHandler.bind(this)}
                    onEnd={this._onEndHandler.bind(this)} 
                    onPause={this._onPauseHandler.bind(this)}
                    onPlay={this._onPlayHandler.bind(this)}
                    onStateChange={this._onStateChangeHandler.bind(this)} />
                <CGBand show={this.state.showCGBand} videoTitle={this.state.currentVideoTitle} ref="gcBand" />
            </div>

        );
    }

    _onReadyHandler( evt ) {
        //console.log(evt);
    }

    _onEndHandler( evt ) {
        console.log('END');
    }

    _onPauseHandler( evt ) {
        console.log('SHOW FOOTER ON PAUSE');
        clearTimeout(this.GCTimeoutId);
        this.refs.gcBand.show();
    }

    _onPlayHandler( evt ) {
        let GCBand = this.refs.gcBand;
        if( evt.target.getCurrentTime() < 5 ){
            GCBand.show( evt.target.getVideoData().title );
            this.GCTimeoutId = setTimeout(()=>{
                GCBand.hide();
            },5000);
        }else{
            console.log('HIDE FOOTER ON RESUME');
            GCBand.hide();
        }
    }

    _onStateChangeHandler( evt ) {
        console.log('STATE CHANGE');
        //console.log(evt);
    }

}

export default App;
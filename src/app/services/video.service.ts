import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

declare var JitsiMeetExternalAPI: any;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videoApi: any;
  private videoApiAluno: any;
  private _domain = 'meet.jit.si';
  private _option = {
    roomName: "",
    width: "100%",
    height: "100%",
    configOverwrite: { prejoinPageEnabled: false },
    interfaceConfigOverwrite: {
      // overwrite interface properties
    },
    parentNode: document.querySelector('.video'),
    userInfo: {
      displayName: "",
    },
  }


  joinSession(
    professor: string,
    roomName: string,
  ): Observable<boolean> {
    if (this.videoApi != null){
      $('.video').html('');
      this.hangup();
    }

    return new Observable((observable) => {
      this._option.roomName = roomName;
      this._option.parentNode = document.querySelector('.video');
      this._option.userInfo.displayName = professor; 
      this.videoApi = new JitsiMeetExternalAPI(this._domain, this._option);

      this.videoApi.addEventListeners({
        readyToClose: this.handleClose,
        participantLeft: this.handleParticipantLeft,
        participantJoined: this.handleParticipantJoined,
        videoConferenceJoined: this.handleVideoConferenceJoined,
        videoConferenceLeft: this.handleVideoConferenceLeft,
        audioMuteStatusChanged: this.handleMuteStatus,
        videoMuteStatusChanged: this.handleVideoStatus,
      })

      observable.next(true);
      observable.complete();
    })
  }

  joinSessionAluno(
    aluno: string,
    roomName: string,
  ): Observable<boolean> {
    if (this.videoApiAluno != null){
      $('.video').html('');
      this.hangup();
    }

    return new Observable((observable) => {
      this._option.roomName = roomName;
      this._option.parentNode = document.querySelector('.video');
      this._option.userInfo.displayName = aluno; 
      this.videoApiAluno = new JitsiMeetExternalAPI(this._domain, this._option);

      this.videoApiAluno.addEventListeners({
        readyToClose: this.handleClose,
        participantLeft: this.handleParticipantLeft,
        participantJoined: this.handleParticipantJoined,
        videoConferenceJoined: this.handleVideoConferenceJoined,
        videoConferenceLeft: this.handleVideoConferenceLeft,
        audioMuteStatusChanged: this.handleMuteStatus,
        videoMuteStatusChanged: this.handleVideoStatus,
      })

      observable.next(true);
      observable.complete();
    })
  }

  handleClose = () => {
    console.log('handleClose');
  };

  handleParticipantLeft = async (participant) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant) => {
    console.log('handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant) => {
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    $('.video').remove();
  };

  handleMuteStatus = (audio) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.videoApi.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  hangup(): any {
    this.videoApi.executeCommand('hangup');

    this.unload();
  }

  unload() {
    $('.video').html('');
  }

  constructor() { }
}

import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;
import * as $ from 'jquery';
import { DataService } from 'src/app/services/data.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-meet-video',
  templateUrl: './meet-video.component.html',
  styleUrls: ['./meet-video.component.scss'],
})
export class MeetVideoComponent implements OnInit, AfterViewInit {
  domain: string = 'meet.jit.si';
  room: any;
  options: any;
  api: any;
  user: any;
  idSala: string = '';

  @Input()
  nome: string = '';
  @Input()
  isProfessor: boolean = false;

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
    $('#jitsi-iframe').remove();
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
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  constructor( private dataService: DataService ) {}

  ngOnInit(): void {
    this.room = uuid.v4(); // Set your room name
    this.user = {
      name: this.nome, // Set your username
    };
  }

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });

    if (this.isProfessor === true) {
      this.dataService.chamarProximo(this.room).subscribe((data) => {
        console.log('data', data);
      });
    }

  }
}

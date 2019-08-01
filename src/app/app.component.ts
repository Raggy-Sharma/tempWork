import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eGmatCodingAssignment';
  // curretQuant: { 'width': string; 'background-color': string; 'height': string; };
  // targetQuant: { 'width': string; 'background-color': string; 'height': string; };
  constructor(private formBuilder: FormBuilder) {
  }
  public quantsForm: FormGroup;
  public verbalForm: FormGroup;
  public totalTargetScore;
  public totalCurrentScore;
  public currentQuantsScore;
  public targetQuantsScore;
  public currentVerbalScore;
  public targetVerbalScore;
  public totalCurrentWidth: any
  public totalTargetWidth: any
  public currentScoreArrowPlacement: any
  public targetScoreArrowPlacement: any;
  public scoreDiff;
  public submitClicked: boolean = false;
  public arrowClassCurrent;
  public arrowClassTarget;

  ngOnInit() {
    this.arrowClassCurrent = 'arrow-down currentArrow';
    this.arrowClassTarget = 'targetArrow'
    this.quantsForm = this.formBuilder.group({
      currentScore: '',
      targetScore: ''
    });
    this.verbalForm = this.formBuilder.group({
      currentScore: '',
      targetScore: ''
    })
    this.totalCurrentWidth = {
      width: 0,
      height: '15px'
    }
    this.totalTargetWidth = {
      width: 0,
      height: '15px'
    }
    this.currentScoreArrowPlacement = {
      width: 0,
      height: '15px'
    }
    this.targetScoreArrowPlacement = {
      width: 0,
      height: '15px'
    }
  }

  onSubmit() {
    this.currentQuantsScore = this.quantsForm.controls.currentScore.value;
    this.currentVerbalScore = this.verbalForm.controls.currentScore.value;
    this.targetQuantsScore = this.quantsForm.controls.targetScore.value;
    this.targetVerbalScore = this.verbalForm.controls.targetScore.value;
    (this.totalCurrentScore && this.totalTargetScore) ? this.submitClicked = true : this.submitClicked = false;


    this.totalCurrentScore = (200 + (Number(this.currentQuantsScore) + Number(this.currentVerbalScore)) * 5);
    this.totalTargetScore = (200 + (Number(this.targetQuantsScore) + Number(this.targetVerbalScore)) * 5);
    if (this.totalCurrentScore < this.totalTargetScore) {
      this.scoreDiff = this.totalTargetScore - this.totalCurrentScore;
      var width;
      width = this.totalCurrentScore / 800 * 100
      var targetWidth;
      targetWidth = this.totalTargetScore / 800 * 100;
      this.currentScoreArrowPlacement = {
        'transition': '1.5s',
        'width': 'calc(' + [width] + '%  + 5px)',
        'height': '15px',
      }
      var setWidth = this.scoreDiff > 30 ? targetWidth - width + '%' : 'calc(' + [targetWidth] + '%  + 5px)'
      this.targetScoreArrowPlacement = {
        'transition': '1.5s',
        'width': setWidth,
        'height': '15px',
      }
      this.totalCurrentWidth = {
        'transition': '1.5s',
        'width': [width] + '%',
        'background-color': '#0fa2eb',
        'height': '15px',
        'border-top-right-radius': '20px',
        'border-bottom-right-radius': '20px'
      }

      this.totalTargetWidth = {
        'transition': '1.5s',
        'width': [targetWidth - width] + '%',
        'background-color': '#ffe28a',
        'height': '15px',
        'border-top-right-radius': '20px',
        'border-bottom-right-radius': '20px',
      }
    } else if (this.totalCurrentScore === this.totalTargetScore) {
      this.arrowClassCurrent = 'arrow-down currentArrow';
      var width;
      width = this.totalCurrentScore / 800 * 100;
      this.currentScoreArrowPlacement = {
        'transition': '1.5s',
        'width': 'calc(' + [width] + '%  + 5px)',
        'height': '15px'
      }
      this.targetScoreArrowPlacement = {
        'transition': '1.5s',
        'width': 'calc(' + [width] + '%  + 5px)',
        'height': '15px'
      }
      this.totalCurrentWidth = {
        'transition': '1.5s',
        'width': [width] + '%',
        'background-color': '#0fa2eb',
        'height': '15px'
      }
      this.totalTargetWidth = {
        'width': 0,
        'background-color': '#f5f5f5',
        'height': '15px'
      }
      this.scoreDiff = ''
    } else {
      this.arrowClassCurrent = 'targetArrow'
      this.arrowClassTarget = 'arrow-down currentArrow'
      this.scoreDiff = this.totalCurrentScore - this.totalTargetScore
      var width;
      width = this.totalTargetScore / 800 * 100;
      var targetWidth;
      targetWidth = this.totalCurrentScore / 800 * 100;
      var setWidth = this.scoreDiff > 30 ? targetWidth - width + '%' : 'calc(' + [targetWidth] + '%  + 5px)'
      this.currentScoreArrowPlacement = {
        'transition': '1.5s',
        'width': 'calc(' + [width] + '%  + 5px)',
        'height': '15px'
      }
      this.targetScoreArrowPlacement = {
        'transition': '1.5s',
        'width': setWidth,
        'height': '15px'
      }
      this.totalCurrentWidth = {
        'transition': '1.5s',
        'width': [width] + '%',
        'background-color': '#0fa2eb',
        'height': '15px'
      }

      this.totalTargetWidth = {
        'transition': '1.5s',
        'width': [targetWidth - width] + '%',
        'background-color': '#0fa2eb',
        'height': '15px'
      }
    }

  }
}
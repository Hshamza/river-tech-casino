"use strict";(self.webpackChunkrivertech_fe_interview=self.webpackChunkrivertech_fe_interview||[]).push([[680],{2680:(L,c,s)=>{s.r(c),s.d(c,{HomeModule:()=>T});var i=s(8583),d=s(4466),r=s(7957),g=s(4762),p=s(5319),m=s(8645),l=s(8906),u=s(1013),t=s(7716),h=s(8723);function f(n,e){1&n&&(t.TgZ(0,"h3",3),t._uU(1,"No Trending Games Available !"),t.qZA())}function v(n,e){if(1&n&&(t.ynx(0),t._UZ(1,"app-game",6),t.BQk()),2&n){const o=e.$implicit;t.xp6(1),t.Q6J("game",o)}}function H(n,e){if(1&n&&(t.TgZ(0,"div",4),t.YNc(1,v,2,1,"ng-container",5),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.Q6J("ngForOf",o.gameList)("ngForTrackBy",o.trackGame)}}class a{constructor(e,o){this._store=e,this.cdr=o,this.gameList=[],this.allSubscriptions=new p.w,this.allSubscriptions.add(this.isGamesLoaded$.subscribe(x=>{x||this._store.dispatch(new u.K.GetGames)}))}ngOnInit(){this.allSubscriptions.add(this.gamesData$.subscribe(e=>{this.gameList=e,this.cdr.detectChanges()}))}trackGame(e,o){return o.id}ngOnDestroy(){var e;null===(e=this.allSubscriptions)||void 0===e||e.unsubscribe()}}a.\u0275fac=function(e){return new(e||a)(t.Y36(m.yh),t.Y36(t.sBO))},a.\u0275cmp=t.Xpm({type:a,selectors:[["ng-component"]],decls:4,vars:2,consts:[[1,"app-home__title"],["class","no-results",4,"ngIf"],["class","game-containers",4,"ngIf"],[1,"no-results"],[1,"game-containers"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"game-tile",3,"game"]],template:function(e,o){1&e&&(t.TgZ(0,"h1",0),t._uU(1,"Trending Games"),t.qZA(),t.YNc(2,f,2,0,"h3",1),t.YNc(3,H,2,2,"div",2)),2&e&&(t.xp6(2),t.Q6J("ngIf",o.gameList&&0==o.gameList.length),t.xp6(1),t.Q6J("ngIf",o.gameList&&0!==o.gameList.length))},directives:[i.O5,i.sg,h.$],styles:[".app-home__json-data-container[_ngcontent-%COMP%]{background-color:#000;color:#fff}@media (max-width: 450px){.app-home__json-data-container[_ngcontent-%COMP%]{color:#39ff14}}.no-results[_ngcontent-%COMP%]{text-align:center;margin-top:30px}"],changeDetection:0}),(0,g.gn)([(0,m.Ph)(l.H.getTrendingGames)],a.prototype,"gamesData$",void 0),(0,g.gn)([(0,m.Ph)(l.H.getLoadedState)],a.prototype,"isGamesLoaded$",void 0);const y=[{path:"",component:a}];let C=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[r.Bz.forChild(y)],r.Bz]}),n})(),T=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[i.ez,C,d.m]]}),n})()}}]);
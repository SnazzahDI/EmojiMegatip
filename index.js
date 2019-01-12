const { Plugin } = require('elements')

module.exports = class EmojiMegatip extends Plugin {
  preload() {
    this.mhBind = this.onMouseHover.bind(this);
    this.moBind = this.onMouseOut.bind(this);
    this.mBind = mrs => mrs.forEach(mr => this.mut(mr));
    document.addEventListener('mouseover', this.mhBind);
    document.addEventListener('mouseout', this.moBind);
    const r = (this.react = this.manager.get('react'));
    r.on('mutation', this.mBind);
  }

  onMouseHover(e) {
    if(e.target.classList && e.target.classList.contains("emoji")) this.lastEmoji = e.target;
      else if (e.target.classList && e.target.classList.contains("reaction"))  this.lastEmoji = e.target.firstChild;
      else if (e.target.classList && e.target.classList.contains("reaction-count")) this.lastEmoji = e.target.previousSibling;
  }

  onMouseOut(e) {
    if(
      (e.fromElement.classList && e.fromElement.classList.contains("emoji") && !e.fromElement.parentNode.classList.contains('reaction'))
      || (e.fromElement.classList && e.fromElement.classList.contains("reaction"))) this.lastEmoji = null;
  }

  mut(rec) {
    if(rec.addedNodes && this.lastEmoji) rec.addedNodes.forEach(n => {
      if(n.classList && n.classList.contains('tooltip-1OS-Ti')){
        let rect = n.getBoundingClientRect();
        let atBottom = rect.top < 200;
        let origwidth = rect.width;
        let origheight = rect.height;
        let img = this.react.createElement(`<img src="${this.lastEmoji.src}" width="128" style="display: -webkit-box; margin-bottom: 5px; align-self: center">`).childNodes[0];
        n.insertBefore(img, n.childNodes[0]);

        let nrect = n.getBoundingClientRect();
        let widthdiff = nrect.width - origwidth;
        let heightdiff = nrect.height - origheight;
        n.style.left = (Number(n.style.left.replace("px", "")) - widthdiff/2) + "px";
        if(atBottom) {
          n.classList.remove('top-1pTh1F');
          n.classList.add('bottom-19kp6S');
        }
        n.style.textAlign = "center";
      }
    });
  }

  unload() {
    document.removeEventListener('mouseover', this.mhBind);
    document.removeEventListener('mouseout', this.moBind);
    this.react.removeListener('mutation', this.mBind);
  }

  get iconURL() {
    return 'https://canary.discordapp.com/assets/53ef346458017da2062aca5c7955946b.svg'
  }

  get color() {
    return 'ffcc4d'
  }
}

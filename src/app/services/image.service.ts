import { Injectable } from '@angular/core';
import { Image } from '../models/image';

@Injectable()
export class ImageService {

  constructor() { }

  MOCK_USER_IMAGES: Image[] = [{
    identifyer: "sonny.cruz",
    src: "assets/Images/Users/harvey-specter.png",
    thumbnail: null
  }, {
    identifyer: "dana.scott",
    src: "assets/Images/Users/dana-scott.png",
    thumbnail: null
  }, {
    identifyer: "donna.paulsen",
    src: "assets/Images/Users/donna-paulsen.png",
    thumbnail: null
  }, {
    identifyer: "harold.gunderson",
    src: "assets/Images/Users/harold-gunderson.png",
    thumbnail: null
  }, {
    identifyer: "jessica.pearson",
    src: "assets/Images/Users/jessica-pearson.png",
    thumbnail: null
  }, {
    identifyer: "louis.litt",
    src: "assets/Images/Users/louis-litt.png",
    thumbnail: null
  }, {
    identifyer: "mike.ross",
    src: "assets/Images/Users/mike-ross.png",
    thumbnail: null
  }, {
    identifyer: "rachel.zane",
    src: "assets/Images/Users/rachel-zane.png",
    thumbnail: null
  }]

  MOCK_SKILL_IMAGES: Image[] = [{
    identifyer: "adobe experience design",
    src: "assets/Images/Skills/adobe-experience-design.png",
    thumbnail: null
  }, {
    identifyer: "adobe illustrator",
    src: "assets/Images/Skills/adobe-illustrator.png",
    thumbnail: null
  }, {
    identifyer: "adobe photoshop",
    src: "assets/Images/Skills/adobe-photoshop.png",
    thumbnail: "assets/Icons/06 photoshop.png"
  }, {
    identifyer: "axure",
    src: "assets/Images/Skills/axure.png",
    thumbnail: null
  }, {
    identifyer: "balsamiq",
    src: "assets/Images/Skills/balsamiq.png",
    thumbnail: "assets/Icons/07 balsamiq.png"
  }, {
    identifyer: "card sorting",
    src: "assets/Images/Skills/card-sorting.png",
    thumbnail: null
  }, {
    identifyer: "comparative analysis",
    src: "assets/Images/Skills/comparative-analysis.png",
    thumbnail: null
  }, {
    identifyer: "high-fidelity prototype",
    src: "assets/Images/Skills/high-fidelity-prototype.png",
    thumbnail: null
  }, {
    identifyer: "information architecture",
    src: "assets/Images/Skills/information-architecture.png",
    thumbnail: null
  }, {
    identifyer: "marvel up",
    src: null,
    thumbnail: "assets/Icons/05 Marvelup.png"
  }, {
    identifyer: "bootstrap",
    src: null,
    thumbnail: "assets/Icons/08 Bootstrap.png"
  }, {
    identifyer: "foundation",
    src: null,
    thumbnail: "assets/Icons/09 Foundation.png"
  }, {
    identifyer: "customer journey map",
    src: null,
    thumbnail: "assets/Icons/10 cj map.png"
  }]

  getUserImage(username) {
    let imgUrl;
    this.MOCK_USER_IMAGES.forEach(image => {
      if (username.toLowerCase() == image.identifyer.toLowerCase() && image.src) {
        imgUrl = image.src;
      }
    });
    return imgUrl;
  }

  getSkillImage(identifyer) {
    let imgUrl;
    this.MOCK_SKILL_IMAGES.forEach(image => {
      if (identifyer.toLowerCase() == image.identifyer.toLowerCase() && image.src) {
        imgUrl = image.src;
      }
    });
    return imgUrl;
  }

  getSkillImageThumbnail(identifyer) {
    let imgUrl;
    this.MOCK_SKILL_IMAGES.forEach(image => {
      if (identifyer.toLowerCase() == image.identifyer.toLowerCase() && image.thumbnail) {
        imgUrl = image.thumbnail;
      }
    });
    return imgUrl;
  }
}

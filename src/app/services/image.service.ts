import { Injectable } from '@angular/core';
import { Image } from '../models/image';

@Injectable()
export class ImageService {

  constructor() { }

  MOCK_USER_IMAGES: Image[] = [{
    identifyer: "sonny.cruz",
    src: "assets/Images/Users/harvey-specter.png",
    thumbnail: null
  },{
    identifyer: "dana.scott",
    src: "assets/Images/Users/dana-scott.png",
    thumbnail: null
  },{
    identifyer: "donna.paulsen",
    src: "assets/Images/Users/donna-paulsen.png",
    thumbnail: null
  },{
    identifyer: "harold.gunderson",
    src: "assets/Images/Users/harold-gunderson.png",
    thumbnail: null
  },{
    identifyer: "jessica.pearson",
    src: "assets/Images/Users/jessica-pearson.png",
    thumbnail: null
  },{
    identifyer: "louis.litt",
    src: "assets/Images/Users/louis-litt.png",
    thumbnail: null
  },{
    identifyer: "mike.ross",
    src: "assets/Images/Users/mike-ross.png",
    thumbnail: null
  },{
    identifyer: "rachel.zane",
    src: "assets/Images/Users/rachel-zane.png",
    thumbnail: null
  }]

  getUserImage(username) {
    let imgUrl;
    this.MOCK_USER_IMAGES.forEach(image => {
      if (username == image.identifyer && image.src) {
        imgUrl = image.src;
      }
    });
    return imgUrl;
  }
}

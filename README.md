[![](https://img.shields.io/npm/v/kaia-face.js.svg)](https://www.npmjs.com/package/kaia-face.js)
[![](https://img.shields.io/npm/l/kaia-face.js.svg)](https://www.npmjs.com/package/kaia-face.js)

# kaia-face.js
Animated robot face to convey various emotional expressions, control gaze direction.

## Live Demo
- [Sample app](https://kaia.ai/view-app/5a0556a554d7fc08c068f3b7)
- Sample app [source code](https://github.com/kaiaai/sample-apps/tree/master/face-animation)

## Use in Browser
```js
<script src="kaia-face.min.js"></script>
const face = new Face({face_width:100,face_height:100});
face.setGazeSpeed('default', 100, 'linear');  // default eye movement speed

face.setExpression('wow');
face.setGazeDirection(0.4, 0.5); // look left: range 0...1, 0.5, 0.5 is center 
// ... some time later
face.setExpression('bored'); // change expression
face.unsetGazeDirection(); // stare ahead
````

## API
### Create
Creates face object and sets its size.
```js
const face = new Face({face_width:100, face_height:100});
````
### Expression Control
Sets displayed expression. There are 32 expressions implemented and available, see below.
```js
// List of implemented expressions
const expressions = ['annoyed', 'anxious', 'apologetic', 'awkward', 'blinking', 'bored', 'crying',
  'default', 'determined', 'embarrased', 'evil', 'excited', 'exhausted', 'flustered', 'furious',
  'giggle', 'happy', 'in-love', 'mischievous', 'realized-something', 'sad', 'sassy', 'scared',
  'shocked', 'snoozing', 'starstruck', 'stuck-up', 'thinking', 'tired', 'upset', 'winking', 'wow'];

face.setExpression('wow');
// ... some time later
face.setExpression('bored'); // change expression
````

| ![annoyed](doc/img/annoyed%20240x240.png?raw=true "default") | ![anxious](doc/img/anxious%20240x240.png?raw=true "anxious") | ![apologetic](doc/img/apologetic%20240x240.png?raw=true "apologetic")  |
|:-------------:|:-------------:|:-----:|
| annoyed | anxious | apologetic |

| ![awkward](doc/img/awkward%20240x240.png?raw=true "awkward") | ![blinking](doc/img/blinking%20240x240.png?raw=true "blinking") | ![bored](doc/img/bored%20240x240.png?raw=true "bored")  |
|:-------------:|:-------------:|:-----:|
| awkward | blinking | bored |

| ![crying](doc/img/crying%20240x240.png?raw=true "crying") | ![default](doc/img/default%20240x240.png?raw=true "default") | ![determined](doc/img/determined%20240x240.png?raw=true "determined")  |
|:-------------:|:-------------:|:-----:|
| crying | default | determined |

| ![embarrased](doc/img/embarrased%20240x240.png?raw=true "embarrased") | ![evil](doc/img/evil%20240x240.png?raw=true "evil") | ![excited](doc/img/excited%20240x240.png?raw=true "excited")  |
|:-------------:|:-------------:|:-----:|
| embarrased | evil | excited |

| ![exhausted](doc/img/exhausted%20240x240.png?raw=true "exhausted") | ![flustered](doc/img/flustered%20240x240.png?raw=true "flustered") | ![furious](doc/img/furious%20240x240.png?raw=true "furious")  |
|:-------------:|:-------------:|:-----:|
| exhausted | flustered | furious |

| ![giggle](doc/img/giggle%20240x240.png?raw=true "giggle") | ![happy](doc/img/happy%20240x240.png?raw=true "happy") | ![in-love](doc/img/in-love%20240x240.png?raw=true "in-love")  |
|:-------------:|:-------------:|:-----:|
| giggle | happy | in-love |

| ![mischievous](doc/img/mischievous%20240x240.png?raw=true "mischievous") | ![realized-something](doc/img/realized-something%20240x240.png?raw=true "realized-something") | ![sad](doc/img/sad%20240x240.png?raw=true "sad")  |
|:-------------:|:-------------:|:-----:|
| mischievous | realized-something | sad |

| ![sassy](doc/img/sassy%20240x240.png?raw=true "sassy") | ![scared](doc/img/scared%20240x240.png?raw=true "scared") | ![shocked](doc/img/shocked%20240x240.png?raw=true "shocked")  |
|:-------------:|:-------------:|:-----:|
| sassy | scared | shocked |

| ![snoozing](doc/img/snoozing%20240x240.png?raw=true "snoozing") | ![starstruck](doc/img/starstruck%20240x240.png?raw=true "starstruck") | ![stuck-up](doc/img/stuck-up%20240x240.png?raw=true "stuck-up")  |
|:-------------:|:-------------:|:-----:|
| snoozing | starstruck | stuck-up |

| ![thinking](doc/img/thinking%20240x240.png?raw=true "thinking") | ![tired](doc/img/tired%20240x240.png?raw=true "tired") | ![upset](doc/img/upset%20240x240.png?raw=true "upset")  |
|:-------------:|:-------------:|:-----:|
| thinking | tired | upset |

| ![winking](doc/img/winking%20240x240.png?raw=true "winking") | ![wow](doc/img/wow%20240x240.png?raw=true "wow") |
|:-------------:|:-------------:|
| winking | wow |


### Gaze Direction Control
Set gaze direction as follows:
```js
// set gaze speed for 'wow' expression; usable speed ranges ~10...100
face.setGazeSpeed('wow', 50, 'linear');
// Make eyes move to (0.4, 0.5)
face.setGazeDirection(0.4, 0.5); // x, y range 0...1.0, where (0.5, 0.5) is center
// ... later
face.unsetGazeDirection(); // stare ahead, at (0.5 0.5)
````

### Animations
Besides eyes being able to change gaze direction, eyes can be animated.
```js
const animations = ['wink', 'widen', 'eye-roll', 'tear-drop', 'blinking', 'fluctuating',
  'fluctuating-upper', 'twitching-lower', 'snoozing'];

// 'wow' expression will use 'widen' animation for eyes
face.setAnimation('wow', 'widen', {enabled:true});
face.playAnimation(); // manually trigger eye animation in current expression
face.unsetAnimation('wow', true); // clear animations previously set for 'wow'

// Advanced animation control examples
// You can use '*' to set animation to all expressions at once
face.setAnimation('*', 'wink', {enabled:true, duration:200, easing:'ease-out', scaleY:0.3,
  elements:['left-eye']}); // one-shot
face.setAnimation('*', 'widen', {enabled:true, duration:600, easing:'ease-in', scaleY:1.5,
  scaleX:1.5, elements:['left-eye']}); // one-shot
face.setAnimation('*', 'eye-roll', {enabled:true, radius:0.3, duration:500,
  elements:['left-eye', 'right-eye'], easing:linear}); // one-shot

face.setAnimation('*', 'tear-drop', {enabled:true, elements:['left-eye'],
  'average-delay':2000, duration:500, easing:'ease-out', stroke:'blue', 'color':'cyan',
   random:false}); // continuous
face.setAnimation("*","blinking",{enabled:true,'average-delay':3000,scaleY:0.2,
  duration:100,elements:["left-eye","right-eye"],"easing":"ease-in-out"}); // continuous
face.setAnimation("*","fluctuating",{enabled:true,elements:["right-eye"],
  "average-delay":1000,duration:800,easing:'ease-in-out',scaleY:0.5,scaleX:2.0}); // continuous  
face.setAnimation("*","fluctuating-upper",{enabled:true,elements:["right-eye"],
    "average-delay":3000,duration:600,easing:"ease-out",top:0.8}); // continuous
face.setAnimation("*","twitching-lower",{enabled:true,elements:["left-eye","right-eye"],
  "average-delay":3000,duration:500,left:0.3,easing:"ease-in"}); // continuous
face.setAnimation("*","snoozing",{enabled:true,elements:["right-eye"],
  "average-delay":2000,duration:3000,easing:'ease-out',left:-0.3,top:-0.3,
  "font-size":40,color:'cyan',random:false}); // continuous
face.unsetAnimation('*', true);
````

### Animation Effects
Eye movement style can be modified by enabling animation effects.
```js
const animationEffects = ['swoosh', 'road-runner', 'splat', 'jelly', 'bounce'];

// Make eyes bounce as gaze direction changes when 'wow' expression is displayed
face.setAnimationEffect('wow', 'bounce', {enabled:true});
face.unsetAnimationEffect('wow', true); // clear eye animation effects associated with 'wow'

// Advanced control
face.setAnimationEffect("*","swoosh",{enabled:true,elements:["right-eye","left-eye"],
  speed:30,'tail-speed':60,'tail-dampent':2.0});
face.setAnimationEffect("default","road-runner",{enabled:true,elements:["left-eye"],
  speed:40,jump:0.7,'jump-restitution':0.1});
face.setAnimationEffect("default","splat",{enabled:true,elements:["right-eye"],
  speed:20,mass:0.4,dampent:0.5});
face.setAnimationEffect("*","jelly",{enabled:true,elements:["right-eye"],
  speed:20,dampent:1.0});
face.setAnimationEffect("*","bounce",{enabled:true,elements:["left-eye"],
  speed:50,dampent:0.1});
face.setAnimationEffect("default-synonym","bounce",{enabled:true});  
face.setAnimationEffect("default-synonym","jelly",{enabled:true});
````
### Synonyms
A shortcut to add new expressions without much work. Take an expression that is not implemented and map it to one of existing expressions.
```js
face.setExpression('amazed'); // error: 'amazed' expression is not available
face.addSynonyms('wow', 'amazed'); // define 'amazed' expression to simply use 'wow'
face.setExpression('amazed'); // no error
````
API use is as follows:
```js
face.addSynonyms('wow', 'wow-synonym'); // add a single synonym to an existing expression
face.addSynonyms('annoyed', ['annoyed-synonym']); // add multiple synonims to an existing expression
````

## Build Setup
- Install Node.js, currently v20.11.1 LTS
- Install npm, currently v10.2.4

## Build
````bash
# npm install gulp-cli -g
git clone https://github.com/kaiaai/kaia-face.js
cd kaia-face.js
npm install
gulp
ls dist/kaia-face.min.js
````

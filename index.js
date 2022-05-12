// get the clientHeight and clientWidth
const bh = document.documentElement.clientHeight
const bw = document.documentElement.clientWidth
const totalPartsNum = 5

// page total Height
var totalH = document.body.scrollHeight || document.documentElement.scrollHeight

// Height able to see
var clientH = window.innerHeight || document.documentElement.clientHeight

// utils
const calScrolled = (partIndex) => {
  let validH = totalH / totalPartsNum - clientH
  let scrollH = document.documentElement.scrollTop - clientH * 3.6 * (partIndex - 1)
  let scrolled =  scrollH / validH
  if (0 > scrolled || scrolled > 1) return;
  return scrolled
}

const drawImageScaled = (img, ctx) => {
   var canvas = ctx.canvas ;
   var hRatio = canvas.width  / img.width    ;
   var vRatio =  canvas.height / img.height  ;
   var ratio  = Math.max ( hRatio, vRatio );
   var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
   var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
   ctx.clearRect(0,0,canvas.width, canvas.height);
   ctx.drawImage(img, 0,0, img.width, img.height,
                      centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
}

const changeFrame = (frame, start, end, contextId, images) => {
  let index = frame
  if (index < start) index = start
  if (index > end) index = end
  let context = $(contextId)[0].getContext('2d')
  drawImageScaled(images[index],context)
}

// part1
const part1Text = document.getElementById("part1-text");
document.addEventListener("scroll", (e) => {
  let scrolled = calScrolled(1)
  part1Text.style.setProperty("--part1-percentage", `${scrolled * 100}%`);
});

// part2
const part2Text = document.getElementById("part2-text");
const loader = new PxLoader()
const part2Images = []
for (let i = 0; i < 100; i++) {
  part2Images[i] = loader.addImage(`./part2/${i}.jpg`)
}

loader.addCompletionListener(function () {
  let context = $('#part2-laputa')[0].getContext('2d')
  context.canvas.height = bh
  context.canvas.width = bw
  $('body').addClass('loaded')
  drawImageScaled(part2Images[0], context)
})
loader.start()

document.addEventListener("scroll", (e) => {
  let scrolled = calScrolled(2)
  let frame = Math.ceil(scrolled * 99)
  if (frame < 80 && frame > 0) {
    part2Text.style.setProperty("--part2-percentage", `${scrolled * 60 - 20}vh`);
    part2Text.style.setProperty("--part2-percentage-opacity", `${scrolled * 100}%`);
  }
  if (frame < 99 & frame > 0) changeFrame(frame, 0, 99, '#part2-laputa', part2Images)
});

// part3

const part3Text = document.getElementById("part3-text");
const part3Images = []
for (let i = 0; i <= 50; i++) {
  part3Images[i] = loader.addImage(`./part3/${i}.jpg`)
}

loader.addCompletionListener(function () {
  let context = $('#part3-stone')[0].getContext('2d')
  context.canvas.height = bh
  context.canvas.width = bw
  $('body').addClass('loaded')
  drawImageScaled(part3Images[0], context)
})
loader.start()

document.addEventListener("scroll", (e) => {
  let scrolled = calScrolled(3)
  if (0 > scrolled || scrolled > 1) return;
  let frame = Math.ceil(scrolled * 50)
  if (frame < 44) {
    part3Text.style.setProperty("--part3-percentage", `${scrolled * 100}%`);
  }
  if (frame < 50 & frame > 0) changeFrame(frame, 0, 50, '#part3-stone', part3Images)
});


// part4

const part4Text = document.getElementById("part4-text");
const part4Images = []
for (let i = 0; i <= 99; i++) {
  part4Images[i] = loader.addImage(`./part4/${i}.jpg`)
}

loader.addCompletionListener(function () {
  let context = $('#part4-castle')[0].getContext('2d')
  context.canvas.height = bh
  context.canvas.width = bw
  $('body').addClass('loaded')
  drawImageScaled(part4Images[0], context)
})
loader.start()

document.addEventListener("scroll", (e) => {
  let scrolled = calScrolled(4)
  if (0 > scrolled || scrolled > 1) return;
  let frame = Math.ceil(scrolled * 99)
  if (frame < 99) {
    part4Text.style.setProperty("--part4-percentage", `${scrolled * 100}%`);
  }
  if (0 < frame & frame < 99) changeFrame(frame, 0, 99, '#part4-castle', part4Images)
});

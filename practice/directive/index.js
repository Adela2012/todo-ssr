import Vue from 'vue'

new Vue({
  el: '#app',
  template: `
    <div>
      <div v-html="html"></div>
      <div v-text="text"></div>
      <div v-if="true">v-if</div>
      <div v-else-if="true">v-else-if</div>
      <div v-else>v-else</div>
      <div v-show="true">v-show</div>
      <ul>
        <li v-for="(item,index) in arr" :key="item">{{item}},{{index}}</li>
        <li v-for="(val,key,index) in obj" :key="val">{{val}},{{key}},{{index}}</li>
      </ul>
      trim:{{trim}}<input v-model.trim="trim"/><br>
      number:{{number}}<input v-model.number="number"/><br>
      lazy:{{lazy}}<input v-model.lazy="lazy"/><br>

      <input type="checkbox" :value="1" v-model="checkbox"/>1<br>
      <input type="checkbox" :value="2" v-model="checkbox"/>2<br>
      <input type="checkbox" :value="3" v-model="checkbox"/>3<br>

      <input type="radio" value="a" v-model="radio"/>a<br>
      <input type="radio" value="b" v-model="radio"/>b<br>
      <input type="radio" value="c" v-model="radio"/>c<br>

    </div>
  `,
  data: {
    arr: [1,2,3,4],
    obj: {
      a: '123',
      b: 11
    },
    trim: '',
    number:'',
    lazy:'',
    text: 0,
    html: '<span>html</span>',
    checkbox: [1],
    radio: 'a',
  }
})

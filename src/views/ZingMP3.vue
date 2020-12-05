<template>
  <h1>Ahihi</h1>
  <div style="width: 100px; height: 100px">
    <!-- <audio
      data-html5-video=""
      controls
      autoplay
      loop
      preload="auto"
      src="https://mp3-s1-zmp3.zadn.vn/06bc15edd2a93bf762b8/7943575942339895486?authen=exp=1607325491~acl=/06bc15edd2a93bf762b8/*~hmac=18af16d7df323dd941a242b3f0fd9bc9"
    ></audio> -->
  </div>
</template>

<script>
import Zing from '@/assets/script/ZingMp3.js'

export default {
  methods:{
  },
  mounted(){
    const id = 'ZWEIUAIF';

    // Zing.getRandomJoke(id)
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err));

    Zing.getFullInfo1(id)
        .then(data => console.log(data))
        .catch(err => console.log(err));
  }
}
</script>

<style lang="css" scoped>

</style>
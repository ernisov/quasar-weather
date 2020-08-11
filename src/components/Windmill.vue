<template>
  <div class="windmill__container">
    <div class="windmill">
      <div class="turbine">
        <div class="turbine__wing first"></div>
        <div class="turbine__wing second"></div>
        <div class="turbine__wing third"></div>
      </div>
      <div class="stand">
        <div class="turbine__center"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style lang="css">
  .windmill__container {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
  }

  .windmill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .turbine {
    width: 100%;
    height: 80%;
    position: relative;
    animation: rotate infinite 7s linear;
  }

  .turbine__center {
    width: .4em;
    height: .4em;
    border-radius: 100000px;
    background-color: black;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .turbine__wing {
    height: 50%;
    width: 4%;
    background-color: black;
    border-radius: 0% 100% 100% 0% / 100% 74% 26% 0% ;
    position: absolute;
    left: 50%;
    top: 0;
    transform-origin: left bottom;
  }

  .turbine__wing.first {
    transform: translateX(-10%);
  }

  .turbine__wing.second {
    transform: rotate(120deg) translateX(-10%);
  }

  .turbine__wing.third {
    transform: rotate(240deg) translateX(-10%);
  }

  .stand {
    height: 60%;
    width: 5%;
    background-color: black;
    border-radius: 44% 56% 100% 0% / 100% 100% 0% 0%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>

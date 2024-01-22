<template>
  <div class="popup">
    <div class="popup__wrap">
      <div class="popup__content col">
        <div class="popup__close close-btn" v-on:click="hidePopup()">X</div>
        <div class="popup__content-wrapper" v-if="$store.state.popup.content">
          <div class="popup__marker" v-if="$store.state.popup.content.properties.color" :style="{ backgroundColor: $store.state.popup.content.properties.color }"></div>
          <div class="popup__name" v-html="$store.state.popup.content.properties.name"></div>
          <div class="popup__disctrict" v-html="$store.state.popup.content.properties.district"></div>
          <div class="popup__status" v-html="$store.state.popup.content.properties.status"></div>
          <div class="popup__area" v-html="$store.state.popup.content.properties.admArea"></div>
        </div>
      </div>
      <div class="popup__shade" v-on:click="hidePopup()"></div>
    </div>
  </div>
</template>


<script>
export default {

    methods: {
        hidePopup: function () {
            this.$store.dispatch('popupUpdate', false);
            document.body.classList.remove('no-scroll');
        },
        escHandler: function (evt) {
            if (evt.key === 'Escape') {
            this.hidePopup();
        }
      }
    },
    mounted: function () {
      document.body.classList.add('no-scroll');
      document.addEventListener('keydown', this.escHandler);
    },
};
</script>


<style>
.popup {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.popup__shade {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  animation-duration: .16s !important;
}
.popup__marker {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.popup__wrap {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 6rem 0;
  box-sizing: border-box;
}

.popup__content-wrapper {
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  gap: 1rem;
}


.popup__content {
  position: relative;
  z-index: 2;
  max-width: 44rem;
  width: 100%;
  padding-top: 2.5rem;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 3rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  color: var(--color__dark);
  background-color: white;
  animation-name: fadeInUp;
  animation-duration: 240ms;
  animation-fill-mode: both;
}

.popup__close {
    color: white;
    font-weight: 700;
  width: 3.5rem;
  height: 3.5rem;
  position: absolute;
  right: -1rem;
  top: -1rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1.5rem;
  cursor: pointer;
  transition: all ease .24s;
}

.popup__close:hover {
	transform: scale(1.05);
}

.order__form textarea {
  resize: none;
}

.order__form .checkbox__label a {
	color: inherit;
	font-weight: 700;
}

.popup__content.--base {
  max-width: 60rem;
}

a.js-popup {
  color: var(--color__dark);
}

.order__row {
  width: calc(100% + 2rem);
}

.order__coll {
  flex: 1;
  margin-right: 2rem;
}

.order__coll.--mw-33 {
  max-width: calc(33% - 2rem);
  margin-top: 2.25rem;
}

.order__btn {
  width: 100%;
  max-width: 100%;
}

.popup__close {
  /* background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 2L10 10M18 18L10 10M10 10L18 2M10 10L2 18' stroke='white' stroke-width='4'/%3E%3C/svg%3E%0A"); */
}


.subscribe__btn {
	font-weight: 600;
	height: 4rem !important;
}

@media screen and (max-width: 1680px) {

}

@media screen and (max-width: 1440px) {

}

@media screen and (max-width: 1366px) {

}

@media screen and (max-width: 1359px) {

}

@media screen and (max-width: 1199px) {

}

@media screen and (max-width: 1024px) {


}

@media screen and (max-width: 991px) {
  .popup__content {
    max-width: 100% !important;
    padding: 2rem;
  }

  .popup__wrap {
    padding: 6rem 1rem;
  }

  .popup__close {
    right: 0;
    top: -1.5rem;
  }

}

@media screen and (max-width: 768px) {
  .order__coll {
    flex: inherit;
    width: 100%;
    max-width: 100% !important;
  }
  .popup-subscribe__list {
	grid-template-columns: unset;
  }
}

@media screen and (max-width: 640px) {

}


</style>
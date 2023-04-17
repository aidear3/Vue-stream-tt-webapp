<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
      <div class="selected" :class="{ open: open }" @click="open = !open">
        {{ selected }}
      </div>
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option.caption;
            open = false;
            $emit('input', option.id);
          "
        >
          {{ option.caption }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { HIGHLIGHT_COLOR_1, FONT_COLOR_1 } from '@/mainConfig';

  export default {
    name: 'CustomSelect',
    props: {
      options: {
        type: Array,
        required: true,
      },
      default: {
        type: String,
        required: false,
        default: null,
      },
      tabindex: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    data() {
      return {
        selected: this.default
          ? this.default
          : this.options.length > 0
          ? this.options[0].caption
          : null,
        open: false,
        BorderStyle: {
          borderColor: HIGHLIGHT_COLOR_1
        }
      };
    },
    mounted() {
      this.$emit("input", this.selected);
    },
  };
  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;
  }
  
  .custom-select .selected {
    background-color: #fff;
    border-radius: 25px;
    border: 1px solid #666666;
    color: #000;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
  }
  
  .custom-select .selected.open {
    border: 1px solid darkred;
    border-radius: 25px;
  }
  
  .custom-select .selected:after {
    position: absolute;
    content: "";
    top: 22px;
    right: 1em;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-color: #000 transparent transparent transparent;
  }
  
  .custom-select .items {
    color: #000;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid darkred;
    border-left: 1px solid darkred;
    border-bottom: 1px solid darkred;
    position: absolute;
    background-color: #0a0a0a;
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .custom-select .items div {
    color: #fff;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
  }
  
  .custom-select .items div:hover {
    background-color: darkred;
  }
  
  .selectHide {
    display: none;
  }
  </style>
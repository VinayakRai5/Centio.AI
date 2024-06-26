<script>
import {StreamResponse} from '../lib/api.js';
import * as Settings from '../lib/meta-settings.js';

export default {
  props: ['app', 'entry'],
  data() {
    return {
      metadata: {},
      is_new: this.entry.name ? false : true,
      running: false,
      live_response: null,
    } 
  },  
  methods: {
    onInitialSave: function() {
      this.app.api.send('/store/update', {
        id: this.entry.id, name: this.entry.name,
      }).then((r) => {
        this.is_new = false;
      });
      this.sendMessage();
    },
    onResponseEvent: function(event) {
      if (event.name == 'content') {
        this.entry.content += event.content;
      } else if (event.name = 'new_entry') {
        this.app.add_entry(event.content);
      }
    },
    save: function() {
      if (!this.entry.id) return;
      this.app.api.send('/store/update', {
        id: this.entry.id,
        name: this.entry.name,
        content: this.entry.content,
        pinned: this.entry.pinned,
        metadata: JSON.stringify(this.metadata),
      });
    },
    sendMessage: function() {
      let messages = [{role: 'user', content: this.entry.name}];
      let model = "assistant";
      let req = this.app.api.completion(messages, model, {temperature: 0.2});
      let res = this.live_response = new StreamResponse(this.onResponseEvent.bind(this));
      this.entry.content = '';
      //this.$set(response, 'info', res);
      this.running = true;
      req.run((line) => {
        res.add(line);
      }).then((r) => {
        this.save();
      }).catch((err) => {
        console.log("Error!", err);
      }).finally(() => {
        console.log("Finished");
        this.running = false;
      });
    },
    onMinimize: function() {
      this.metadata.view = this.metadata.view == 'sm' ? 'reg' : 'sm';
      this.save();
    },
    onPin: function() {
      this.entry.pinned = !this.entry.pinned;
      this.save();
    },
  },
  beforeUnmount: function() {
  },
  created: function() {
    if (!this.entry.name) this.entry.name = '';
    if (!this.entry.content) this.entry.content = '';
    let md;
    try {
      md = JSON.parse(this.entry.metadata);
    } catch {}
    this.metadata = Settings.get_settings(md, JSON.parse(Settings.stream_settings));
  },
}
</script>

<template>
<div class="flex-x my-3">
  <div class="card flex-grow"
      :class="metadata.view == 'sm' ? 'text-xs' : ''">
    <div class="flex-x mb-2" v-if="!is_new">
      <svg-icon name="loader" size="16" v-if="running" class="rotate"></svg-icon>
      <button @click="sendMessage" class="btn-plain muted mr-2 btn flex-x flex-ctr" v-if="!running">
        <svg-icon class="mr-2" name="play"></svg-icon>
        Replay
      </button>
      <div class="flex-grow"></div>
      <button @click="$emit('delete')" class="btn btn-plain flex-x flex-ctr mr-2" v-if="!running">
        <svg-icon class="" name="x"></svg-icon>
      </button>
      <button @click="onMinimize" class="btn btn-plain flex-x flex-ctr mr-2"
          :class="metadata.view == 'sm' ? 'btn-pri' : ''">
        <svg-icon class="" :invert="metadata.view == 'sm'" name="minimize-2"></svg-icon>
      </button>
      <button @click="onPin" class="btn btn-plain flex-x flex-ctr"
          :class="entry.pinned ? 'btn-pri' : ''" v-if="false">
        <svg-icon class="" name="star" :invert="entry.pinned"></svg-icon>
      </button>
    </div>
    <p v-if="is_new">
      Let your assistant search the web and handle tasks for you!
    </p>
    <div class="flex-x flex-grow" style="position: relative;">
      <AutoTextarea classes="form-control flex-grow" class="flex-grow" xrows="3"
          v-model="entry.name"
          styles="border-color: #0000; box-shadow: none;"
          :class="is_new ? 'text-xl' : (metadata.view == 'sm' ? 'text-xs' : '')"
          placeholder="Enter your assistant request...">
      </AutoTextarea>
    </div>
    <div v-if="is_new" class="flex-x flex-grow mt-2" style="text-align: right;">
      <button @click="onInitialSave" class="btn btn-pri text-lg">Send</button>
      <button @click="$emit('delete', {skip_confirm: true})" class="btn text-lg ml-3">Cancel</button>
    </div>
    <div class="mx-2 text mt-1"
      v-else v-html="app.markdown(entry.content)"></div>
    <div v-if="live_response">
      <div>
        <div>State: {{ live_response.state  }}</div>
        <div>Status: {{ live_response.status  }}</div>
      </div>
      <div v-for="entry in live_response.entries" style="display: inline-block;"
          v-if="entry.data_type != 'stream'"
          @click="app.open_entry(entry)"
          class="clickable text-sm bg-sec mr-2">
        New {{ entry.data_type }}
      </div>
      <button @click="onShowLog(log)" class="btn btn-sm ml-2">⛶</button>
    </div>
  </div>
</div>
</template>

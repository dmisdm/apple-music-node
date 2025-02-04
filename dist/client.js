"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const resourceClient_1 = require("./resourceClient");
class Client {
    constructor(configuration) {
        this.configuration = configuration;
        this.albums = new resourceClient_1.ResourceClient('albums', this.configuration);
        this.artists = new resourceClient_1.ResourceClient('artists', this.configuration);
        this.musicVideos = new resourceClient_1.ResourceClient('music-videos', this.configuration);
        this.playlists = new resourceClient_1.ResourceClient('playlists', this.configuration);
        this.songs = new resourceClient_1.ResourceClient('songs', this.configuration);
        this.stations = new resourceClient_1.ResourceClient('stations', this.configuration);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map
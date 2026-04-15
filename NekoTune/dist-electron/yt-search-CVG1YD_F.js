import { i as __require, t as __commonJSMin } from "./chunk-olfrzTEO.js";
//#region node_modules/yt-search/dist/yt-search.js
var require_yt_search = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(f) {
		if (typeof exports === "object" && typeof module !== "undefined") module.exports = f();
		else if (typeof define === "function" && define.amd) define([], f);
		else {
			var g;
			if (typeof window !== "undefined") g = window;
			else if (typeof global !== "undefined") g = global;
			else if (typeof self !== "undefined") g = self;
			else g = this;
			g.ytSearch = f();
		}
	})(function() {
		return (function() {
			function r(e, n, t) {
				function o(i, f) {
					if (!n[i]) {
						if (!e[i]) {
							var c = "function" == typeof __require && __require;
							if (!f && c) return c(i, !0);
							if (u) return u(i, !0);
							var a = /* @__PURE__ */ new Error("Cannot find module '" + i + "'");
							throw a.code = "MODULE_NOT_FOUND", a;
						}
						var p = n[i] = { exports: {} };
						e[i][0].call(p.exports, function(r) {
							var n = e[i][1][r];
							return o(n || r);
						}, p, p.exports, r, e, n, t);
					}
					return n[i].exports;
				}
				for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++) o(t[i]);
				return o;
			}
			return r;
		})()({
			1: [function(require, module$1, exports$1) {
				"use strict";
				function _typeof(o) {
					"@babel/helpers - typeof";
					return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
						return typeof o;
					} : function(o) {
						return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
					}, _typeof(o);
				}
				var _cheerio = require("cheerio");
				var _dasu = require("dasu");
				require("async.parallellimit");
				_dasu.follow = true;
				_dasu.debug = false;
				var _require = require("./util.js"), _getScripts = _require._getScripts, _findLine = _require._findLine, _between = _require._between;
				var MAX_RETRY_ATTEMPTS = 3;
				var RETRY_INTERVAL = 333;
				var jpp = require("jsonpath-plus").JSONPath;
				var _jp = {};
				_jp.query = function(json, path) {
					return jpp({
						path,
						json,
						resultType: "value"
					});
				};
				_jp.value = function(json, path) {
					return jpp({
						path,
						json,
						resultType: "value"
					})[0];
				};
				var _userAgent = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) (yt-search; https://www.npmjs.com/package/yt-search)";
				var _url = require("url");
				var _envs = {};
				Object.keys(process.env).forEach(function(key) {
					var n = process.env[key];
					if (n == "0" || n == "false" || !n) return _envs[key] = false;
					_envs[key.toLowerCase()] = n;
				});
				var _debugging = _envs.debug;
				function debug() {
					if (!_debugging) return;
					console.log("DEBUGGING");
					console.log.apply(this, arguments);
				}
				var _querystring = require("querystring");
				var _humanTime = require("human-time");
				var TEMPLATES = {
					YT: "https://youtube.com",
					SEARCH_MOBILE: "https://m.youtube.com/results",
					SEARCH_DESKTOP: "https://www.youtube.com/results"
				};
				/**
				* Exports
				**/
				module$1.exports = function(query, callback) {
					return search(query, callback);
				};
				module$1.exports.search = search;
				module$1.exports._parseSearchResultInitialData = _parseSearchResultInitialData;
				module$1.exports._parseVideoInitialData = _parseVideoInitialData;
				module$1.exports._parsePlaylistInitialData = _parsePlaylistInitialData;
				module$1.exports._videoFilter = _videoFilter;
				module$1.exports._playlistFilter = _playlistFilter;
				module$1.exports._channelFilter = _channelFilter;
				module$1.exports._liveFilter = _liveFilter;
				module$1.exports._allFilter = _allFilter;
				module$1.exports._parseNumbers = _parseNumbers;
				module$1.exports._parsePlaylistLastUpdateTime = _parsePlaylistLastUpdateTime;
				/**
				* Main
				*/
				function search(query, callback) {
					if (!callback) return new Promise(function(resolve, reject) {
						search(query, function(err, data) {
							if (err) return reject(err);
							resolve(data);
						});
					});
					var _options;
					if (typeof query === "string") _options = { query };
					else _options = query;
					_options._attempts = (_options._attempts || 0) + 1;
					var retryOptions = Object.assign({}, _options);
					function callback_with_retry(err, data) {
						if (err) if (_options._attempts > (_options.MAX_RETRY_ATTEMPTS || MAX_RETRY_ATTEMPTS)) return callback(err, data);
						else {
							debug(" === ");
							debug(" RETRYING: " + _options._attempts);
							debug(" === ");
							var n = _options._attempts;
							var wait_ms = Math.pow(2, n - 1) * (_options.RETRY_INTERVAL || RETRY_INTERVAL);
							setTimeout(function() {
								search(retryOptions, callback);
							}, wait_ms);
						}
						else return callback(err, data);
					}
					if (_options.userAgent) _userAgent = _options.userAgent;
					_options.search = _options.query || _options.search;
					_options.original_search = _options.search;
					if (_options.videoId) return getVideoMetaData(_options, callback_with_retry);
					if (_options.listId) return getPlaylistMetaData(_options, callback_with_retry);
					if (!_options.search) return callback(Error("yt-search: no query given"));
					work();
					function work() {
						getSearchResults(_options, callback_with_retry);
					}
				}
				function _videoFilter(video, index, videos) {
					if (video.type !== "video") return false;
					var videoId = video.videoId;
					return videos.findIndex(function(el) {
						return videoId === el.videoId;
					}) === index;
				}
				function _playlistFilter(result, index, results) {
					if (result.type !== "list") return false;
					var id = result.listId;
					return results.findIndex(function(el) {
						return id === el.listId;
					}) === index;
				}
				function _channelFilter(result, index, results) {
					if (result.type !== "channel") return false;
					var url = result.url;
					return results.findIndex(function(el) {
						return url === el.url;
					}) === index;
				}
				function _liveFilter(result, index, results) {
					if (result.type !== "live") return false;
					var videoId = result.videoId;
					return results.findIndex(function(el) {
						return videoId === el.videoId;
					}) === index;
				}
				function _allFilter(result, index, results) {
					switch (result.type) {
						case "video":
						case "list":
						case "channel":
						case "live": break;
						default: return false;
					}
					var url = result.url;
					return results.findIndex(function(el) {
						return url === el.url;
					}) === index;
				}
				function getSearchResults(_options, callback) {
					var q = _querystring.escape(_options.search).split(/\s+/);
					var hl = _options.hl || "en";
					var gl = _options.gl || "US";
					var category = _options.category || "";
					var pageStart = Number(_options.pageStart) || 1;
					var pageEnd = Number(_options.pageEnd) || Number(_options.pages) || 1;
					if (pageStart <= 0) {
						pageStart = 1;
						if (pageEnd >= 1) pageEnd += 1;
					}
					if (Number.isNaN(pageEnd)) callback("error: pageEnd must be a number");
					_options.pageStart = pageStart;
					_options.pageEnd = pageEnd;
					_options.currentPage = _options.currentPage || pageStart;
					var queryString = "?";
					queryString += "search_query=" + q.join("+");
					if (queryString.indexOf("&hl=") === -1) queryString += "&hl=" + hl;
					if (queryString.indexOf("&gl=") === -1) queryString += "&gl=" + gl;
					if (category) queryString += "&category=" + category;
					if (_options.sp) queryString += "&sp=" + _options.sp;
					var uri = TEMPLATES.SEARCH_DESKTOP + queryString;
					var params = _url.parse(uri);
					params.headers = {
						"user-agent": _userAgent,
						"accept": "text/html",
						"accept-encoding": "gzip",
						"accept-language": "en-US"
					};
					debug(params);
					debug("getting results: " + _options.currentPage);
					_dasu.req(params, function(err, res, body) {
						if (err) callback(err);
						else {
							if (res.status !== 200) return callback("http status: " + res.status);
							if (_debugging) {
								var fs = require("fs");
								require("path");
								fs.writeFileSync("dasu.response", res.responseText, "utf8");
							}
							try {
								_parseSearchResultInitialData(body, function(err, results) {
									if (err) return callback(err);
									var list = results;
									var videos = list.filter(_videoFilter);
									var playlists = list.filter(_playlistFilter);
									var channels = list.filter(_channelFilter);
									var live = list.filter(_liveFilter);
									var all = list.filter(_allFilter);
									_options._data = _options._data || {};
									_options._data.videos = _options._data.videos || [];
									_options._data.playlists = _options._data.playlists || [];
									_options._data.channels = _options._data.channels || [];
									_options._data.live = _options._data.live || [];
									_options._data.all = _options._data.all || [];
									videos.forEach(function(item) {
										_options._data.videos.push(item);
									});
									playlists.forEach(function(item) {
										_options._data.playlists.push(item);
									});
									channels.forEach(function(item) {
										_options._data.channels.push(item);
									});
									live.forEach(function(item) {
										_options._data.live.push(item);
									});
									all.forEach(function(item) {
										_options._data.all.push(item);
									});
									_options.currentPage++;
									if (_options.currentPage <= _options.pageEnd && results._sp) {
										_options.sp = results._sp;
										setTimeout(function() {
											getSearchResults(_options, callback);
										}, 2500);
									} else {
										var _videos = _options._data.videos.filter(_videoFilter);
										var _playlists = _options._data.playlists.filter(_playlistFilter);
										var _channels = _options._data.channels.filter(_channelFilter);
										var _live = _options._data.live.filter(_liveFilter);
										callback(null, {
											all: _options._data.all.slice(_allFilter),
											videos: _videos,
											live: _live,
											playlists: _playlists,
											lists: _playlists,
											accounts: _channels,
											channels: _channels
										});
									}
								});
							} catch (err) {
								callback(err);
							}
						}
					});
				}
				function _parseSearchResultInitialData(responseText, callback) {
					var re = /{.*}/;
					var $ = _cheerio.load(responseText);
					var initialData = $("div#initial-data").html() || "";
					initialData = re.exec(initialData) || "";
					if (!initialData) {
						var scripts = $("script");
						for (var i = 0; i < scripts.length; i++) $(scripts[i]).html().split("\n").forEach(function(line) {
							var i;
							while ((i = line.indexOf("ytInitialData")) >= 0) {
								line = line.slice(i + 13);
								var match = re.exec(line);
								if (match && match.length > initialData.length) initialData = match;
							}
						});
					}
					if (!initialData) return callback("could not find inital data in the html document");
					var errors = [];
					var results = [];
					var json = JSON.parse(initialData[0]);
					var items = _jp.query(json, "$..itemSectionRenderer..contents.*");
					_jp.query(json, "$..primaryContents..contents.*").forEach(function(item) {
						items.push(item);
					});
					debug("items.length: " + items.length);
					for (var _i = 0; _i < items.length; _i++) {
						var item = items[_i];
						var result = void 0;
						var type = "unknown";
						var hasList = _jp.value(item, "$..compactPlaylistRenderer") || _jp.value(item, "$..playlistRenderer") || _jp.value(item, "$..lockupViewModel..metadata..metadataRows[0]..metadataParts[1]..text.[?(@property == \"content\" && @ == \"Playlist\")]");
						var hasChannel = _jp.value(item, "$..compactChannelRenderer") || _jp.value(item, "$..channelRenderer");
						var hasVideo = _jp.value(item, "$..compactVideoRenderer") || _jp.value(item, "$..videoRenderer");
						var listId = hasList && _jp.value(item, "$..watchEndpoint..playlistId");
						var channelId = hasChannel && _jp.value(item, "$..channelId");
						var videoId = hasVideo && _jp.value(item, "$..videoId");
						var watchingLabel = _jp.query(item, "$..viewCountText..text").join("");
						var isUpcoming = _jp.query(item, "$..thumbnailOverlayTimeStatusRenderer..style").join("").toUpperCase().trim() === "UPCOMING";
						var isLive = watchingLabel.indexOf("watching") >= 0 || _jp.query(item, "$..badges..label").join("").toUpperCase().trim() === "LIVE NOW" || _jp.query(item, "$..thumbnailOverlayTimeStatusRenderer..text").join("").toUpperCase().trim() === "LIVE" || isUpcoming;
						if (videoId) type = "video";
						if (channelId) type = "channel";
						if (listId) type = "list";
						if (isLive) type = "live";
						try {
							switch (type) {
								case "video":
									var thumbnail = _normalizeThumbnail(_jp.value(item, "$..thumbnail..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails"));
									var title = _jp.value(item, "$..title..text") || _jp.value(item, "$..title..simpleText");
									var author_name = _jp.value(item, "$..shortBylineText..text") || _jp.value(item, "$..longBylineText..text");
									var author_url = _jp.value(item, "$..shortBylineText..url") || _jp.value(item, "$..longBylineText..url");
									var agoText = _jp.value(item, "$..publishedTimeText..text") || _jp.value(item, "$..publishedTimeText..simpleText");
									var viewCountText = _jp.value(item, "$..viewCountText..text") || _jp.value(item, "$..viewCountText..simpleText") || "0";
									var viewsCount = Number(viewCountText.split(/\s+/)[0].split(/[,.]/).join("").trim());
									var duration = _parseDuration(_jp.value(item, "$..lengthText..text") || _jp.value(item, "$..lengthText..simpleText") || "0:00");
									var description = _jp.query(item, "$..detailedMetadataSnippets..snippetText..text").join("") || _jp.query(item, "$..description..text").join("") || _jp.query(item, "$..descriptionSnippet..text").join("");
									result = {
										type: "video",
										videoId,
										url: TEMPLATES.YT + "/watch?v=" + videoId,
										title: title.trim(),
										description,
										image: thumbnail,
										thumbnail,
										seconds: Number(duration.seconds),
										timestamp: duration.timestamp,
										duration,
										ago: agoText,
										views: Number(viewsCount),
										author: {
											name: author_name,
											url: TEMPLATES.YT + author_url
										}
									};
									break;
								case "list":
									var _thumbnail = _normalizeThumbnail(_jp.value(item, "$..primaryThumbnail..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnail..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails"));
									var _title = _jp.value(item, "$..metadata..title..content") || _jp.value(item, "$..title..text") || _jp.value(item, "$..title..simpleText");
									var _author_name = _jp.value(item, "$..metadataParts[0]..text..content") || _jp.value(item, "$..shortBylineText..text") || _jp.value(item, "$..shortBylineText..text") || _jp.value(item, "$..longBylineText..text") || _jp.value(item, "$..shortBylineText..simpleText") || _jp.value(item, "$..longBylineText..simpleTextn") || "YouTube";
									var _author_url = _jp.value(item, "$..metadataParts[0]..url") || _jp.value(item, "$..shortBylineText..url") || _jp.value(item, "$..longBylineText..url") || "";
									var video_count_label = _jp.value(item, "$..overlays..thumbnailBadges..text");
									var video_count = _jp.value(item, "$..videoCountShortText..text") || _jp.value(item, "$..videoCountText..text") || _jp.value(item, "$..videoCountShortText..simpleText") || _jp.value(item, "$..videoCountText..simpleText") || _jp.value(item, "$..thumbnailText..text") || _jp.value(item, "$..thumbnailText..simpleText");
									result = {
										type: "list",
										listId,
										url: TEMPLATES.YT + "/playlist?list=" + listId,
										title: _title.trim(),
										image: _thumbnail,
										thumbnail: _thumbnail,
										videoCount: Number(_parseNumbers(video_count_label)[0]) || video_count,
										author: {
											name: _author_name,
											url: TEMPLATES.YT + _author_url
										}
									};
									break;
								case "channel":
									var _thumbnail2 = _normalizeThumbnail(_jp.value(item, "$..thumbnail..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails"));
									var _title2 = _jp.value(item, "$..title..text") || _jp.value(item, "$..title..simpleText") || _jp.value(item, "$..displayName..text");
									var _channelId = _jp.value(item, "$..channelRenderer..channelId") || "";
									var _author_name2 = _jp.value(item, "$..shortBylineText..text") || _jp.value(item, "$..longBylineText..text") || _jp.value(item, "$..displayName..text") || _jp.value(item, "$..displayName..simpleText");
									var about_channel = _jp.query(item, "$..channelRenderer..descriptionSnippet..text").join("") || "";
									var _video_count_label = _jp.value(item, "$..videoCountText..simpleText") || _jp.value(item, "$..videoCountText..label") || _jp.value(item, "$..videoCountText..text") || "0";
									var channel_verified = (_jp.value(item, "$..channelRenderer..ownerBadges..style") || _jp.value(item, "$..channelRenderer..ownerBadges..tooltip") || _jp.value(item, "$..channelRenderer..ownerBadges..label") || "").toLowerCase().trim().search(/[\s_]?verified/) >= 0;
									var sub_count_label = _jp.value(item, "$..subscriberCountText..simpleText") || _jp.value(item, "$..subscriberCountText..text") || "0";
									if (typeof sub_count_label === "string") {
										if (sub_count_label.indexOf("subscribe") < 1) {
											if (_video_count_label.indexOf("subscribe") > 0) {
												sub_count_label = _video_count_label;
												_video_count_label = "-1";
											}
										}
										sub_count_label = sub_count_label.split(/\s+/).filter(function(w) {
											return w.match(/\d/);
										})[0];
									}
									var base_url = _jp.value(item, "$..navigationEndpoint..url") || _jp.value(item, "$..browseEndpoint..canonicalBaseUrl") || _jp.value(item, "$..browseEndpoint..url") || "/user/" + _title2;
									result = {
										type: "channel",
										name: _author_name2,
										url: TEMPLATES.YT + base_url,
										baseUrl: base_url,
										id: _channelId,
										title: _title2.trim(),
										about: about_channel,
										image: _thumbnail2,
										thumbnail: _thumbnail2,
										videoCount: Number(_parseNumbers(_video_count_label)[0]),
										videoCountLabel: _video_count_label,
										verified: channel_verified,
										subCount: _parseSubCountLabel(sub_count_label),
										subCountLabel: sub_count_label
									};
									break;
								case "live":
									var _thumbnail3 = _normalizeThumbnail(_jp.value(item, "$..thumbnail..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails..url")) || _normalizeThumbnail(_jp.value(item, "$..thumbnails"));
									var _title3 = _jp.value(item, "$..title..text") || _jp.value(item, "$..title..simpleText");
									var _author_name3 = _jp.value(item, "$..shortBylineText..text") || _jp.value(item, "$..longBylineText..text");
									var _author_url2 = _jp.value(item, "$..shortBylineText..url") || _jp.value(item, "$..longBylineText..url");
									var _watchingLabel = _jp.query(item, "$..viewCountText..text").join("") || _jp.query(item, "$..viewCountText..simpleText").join("") || "0";
									var watchCount = Number(_watchingLabel.split(/\s+/)[0].split(/[,.]/).join("").trim());
									var _description = _jp.query(item, "$..detailedMetadataSnippets..snippetText..text").join("") || _jp.query(item, "$..description..text").join("") || _jp.query(item, "$..descriptionSnippet..text").join("");
									var scheduledEpochTime = _jp.value(item, "$..upcomingEventData..startTime");
									var scheduledTime = Date.now() > scheduledEpochTime ? scheduledEpochTime * 1e3 : scheduledEpochTime;
									var scheduledDateString = _toInternalDateString(scheduledTime);
									result = {
										type: "live",
										videoId,
										url: TEMPLATES.YT + "/watch?v=" + videoId,
										title: _title3.trim(),
										description: _description,
										image: _thumbnail3,
										thumbnail: _thumbnail3,
										watching: Number(watchCount),
										author: {
											name: _author_name3,
											url: TEMPLATES.YT + _author_url2
										}
									};
									if (scheduledTime) {
										result.startTime = scheduledTime;
										result.startDate = scheduledDateString;
										result.status = "UPCOMING";
									} else result.status = "LIVE";
									break;
								default:
							}
							if (result) results.push(result);
						} catch (err) {
							debug(err);
							errors.push(err);
						}
					}
					results._ctoken = _jp.value(json, "$..continuation");
					if (errors.length) return callback(errors.pop(), results);
					return callback(null, results);
				}
				function getVideoMetaData(opts, callback) {
					debug("fn: getVideoMetaData");
					var videoId;
					if (typeof opts === "string") videoId = opts;
					if (_typeof(opts) === "object") videoId = opts.videoId;
					var _opts$hl = opts.hl, hl = _opts$hl === void 0 ? "en" : _opts$hl, _opts$gl = opts.gl, gl = _opts$gl === void 0 ? "US" : _opts$gl;
					var uri = "https://www.youtube.com/watch?hl=".concat(hl, "&gl=").concat(gl, "&v=").concat(videoId);
					var params = _url.parse(uri);
					params.headers = {
						"user-agent": _userAgent,
						"accept": "text/html",
						"accept-encoding": "gzip",
						"accept-language": "".concat(hl, "-").concat(gl)
					};
					params.headers["user-agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15";
					_dasu.req(params, function(err, res, body) {
						if (err) callback(err);
						else {
							if (res.status !== 200) return callback("http status: " + res.status);
							if (_debugging) {
								var fs = require("fs");
								require("path");
								fs.writeFileSync("dasu.response", res.responseText, "utf8");
							}
							try {
								_parseVideoInitialData(body, callback);
							} catch (err) {
								callback(err);
							}
						}
					});
				}
				function _parseVideoInitialData(responseText, callback) {
					debug("_parseVideoInitialData");
					responseText = _getScripts(responseText);
					var initialData = _between(_findLine(/ytInitialData.*=\s*{/, responseText), "{", "}");
					if (!initialData) return callback("could not find inital data in the html document");
					var initialPlayerData = _between(_findLine(/ytInitialPlayerResponse.*=\s*{/, responseText), "{", "}");
					if (!initialPlayerData) return callback("could not find inital player data in the html document");
					var idata = JSON.parse(initialData);
					var ipdata = JSON.parse(initialPlayerData);
					var videoId = _jp.value(idata, "$..currentVideoEndpoint..videoId");
					if (!videoId) return callback("video unavailable");
					if (_jp.value(ipdata, "$..status") === "ERROR" || _jp.value(ipdata, "$..reason") === "Video unavailable") return callback("video unavailable");
					var title = _parseVideoMetaDataTitle(idata);
					var description = _jp.query(idata, "$..detailedMetadataSnippets..snippetText..text").join("") || _jp.query(idata, "$..description..text").join("") || _jp.query(ipdata, "$..description..simpleText").join("") || _jp.query(ipdata, "$..microformat..description..simpleText").join("") || _jp.query(ipdata, "$..videoDetails..shortDescription").join("");
					var author_name = _jp.value(idata, "$..owner..title..text") || _jp.value(idata, "$..owner..title..simpleText");
					var author_url = _jp.value(idata, "$..owner..navigationEndpoint..url") || _jp.value(idata, "$..owner..title..url");
					var thumbnailUrl = "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";
					var duration = _parseDuration(_msToTimestamp(Number(_jp.value(ipdata, "$..videoDetails..lengthSeconds")) * 1e3));
					var uploadDate = _jp.value(idata, "$..uploadDate") || _jp.value(idata, "$..dateText..simpleText");
					var agoText = uploadDate && _humanTime(new Date(uploadDate)) || "";
					var video = {
						title,
						description,
						url: TEMPLATES.YT + "/watch?v=" + videoId,
						videoId,
						seconds: Number(duration.seconds),
						timestamp: duration.timestamp,
						duration,
						views: Number(_jp.value(ipdata, "$..videoDetails..viewCount")),
						genre: (_jp.value(ipdata, "$..category") || "").toLowerCase(),
						uploadDate: _toInternalDateString(uploadDate),
						ago: agoText,
						image: thumbnailUrl,
						thumbnail: thumbnailUrl,
						author: {
							name: author_name,
							url: TEMPLATES.YT + author_url
						}
					};
					if (!video.description || !video.timestamp || !video.seconds || !video.views) {
						debug("in video metadata backup to fill in missing data");
						var q = "".concat(video.title);
						debug("q (before): " + q);
						while (q && q[0].match(/[-]/)) q = q.slice(1);
						debug("q (after) : " + q);
						setTimeout(function() {
							search({
								query: q,
								options: { RETRY_INTERVAL: 1e3 }
							}, function(err, r) {
								if (err) return callback(err);
								if (!r.videos) return callback(null, video);
								var _loop = function _loop() {
									var v = r.videos[i];
									if (!v) return 0;
									if (video.videoId != null && video.videoId === (v === null || v === void 0 ? void 0 : v.videoId)) {
										Object.keys(video).forEach(function(key) {
											video[key] = v[key] || video[key];
										});
										return 1;
									}
								}, _ret;
								for (var i = 0; i < r.videos.length; i++) {
									_ret = _loop();
									if (_ret === 0) continue;
									if (_ret === 1) break;
								}
								callback(err, video);
							});
						}, 1500);
					} else callback(null, video);
				}
				function getPlaylistMetaData(opts, callback) {
					debug("fn: getPlaylistMetaData");
					var listId;
					if (typeof opts === "string") listId = opts;
					if (_typeof(opts) === "object") listId = opts.listId || opts.playlistId;
					var _opts$hl2 = opts.hl, hl = _opts$hl2 === void 0 ? "en" : _opts$hl2, _opts$gl2 = opts.gl, gl = _opts$gl2 === void 0 ? "US" : _opts$gl2;
					var uri = "https://www.youtube.com/playlist?hl=".concat(hl, "&gl=").concat(gl, "&list=").concat(listId);
					var params = _url.parse(uri);
					params.headers = {
						"user-agent": _userAgent,
						"accept": "text/html",
						"accept-encoding": "gzip",
						"accept-language": "".concat(hl, "-").concat(gl)
					};
					_dasu.req(params, function(err, res, body) {
						if (err) callback(err);
						else {
							if (res.status !== 200) return callback("http status: " + res.status);
							if (_debugging) {
								var fs = require("fs");
								require("path");
								fs.writeFileSync("dasu.response", res.responseText, "utf8");
							}
							try {
								_parsePlaylistInitialData(body, callback);
							} catch (err) {
								callback(err);
							}
						}
					});
				}
				function _parsePlaylistInitialData(responseText, callback) {
					debug("fn: parsePlaylistBody");
					responseText = _getScripts(responseText);
					var jsonString = responseText.match(/ytInitialData.*=\s*({.*});/)[1];
					if (!jsonString) throw new Error("failed to parse ytInitialData json data");
					var json = JSON.parse(jsonString);
					var plerr = _jp.value(json, "$..alerts..alertRenderer");
					if (plerr && typeof plerr.type === "string" && plerr.type.toLowerCase() === "error") {
						var plerrtext = "playlist error, not found?";
						if (_typeof(plerr.text) === "object") plerrtext = _jp.query(plerr.text, "$..text").join("");
						if (typeof plerr.text === "string") plerrtext = plerr.text;
						throw new Error("playlist error: " + plerrtext);
					}
					var alertInfo = "";
					_jp.query(json, "$..alerts..text").forEach(function(val) {
						if (typeof val === "string") alertInfo += val;
						if (_typeof(val) === "object") {
							var simpleText = _jp.value(val, "$..simpleText");
							if (simpleText) alertInfo += simpleText;
						}
					});
					var listId = _jp.value(json, "$..microformat..urlCanonical").split("=")[1];
					var viewCount = 0;
					try {
						var viewCountLabel = _jp.value(json, "$..sidebar.playlistSidebarRenderer.items[0]..stats[1].simpleText");
						if (viewCountLabel.toLowerCase() === "no views") viewCount = 0;
						else viewCount = viewCountLabel.match(/\d+/g).join("");
					} catch (err) {}
					var size = (_jp.value(json, "$..sidebar.playlistSidebarRenderer.items[0]..stats[0].simpleText") || _jp.query(json, "$..sidebar.playlistSidebarRenderer.items[0]..stats[0]..text").join("")).match(/\d+/g).join("");
					var list = _jp.query(json, "$..playlistVideoListRenderer..contents")[0];
					_typeof(list[list.length - 1].continuationItemRenderer);
					var videos = [];
					list.forEach(function(item) {
						if (!item.playlistVideoRenderer) return;
						var json = item;
						var duration = _parseDuration(_jp.value(json, "$..lengthText..simpleText") || _jp.value(json, "$..thumbnailOverlayTimeStatusRenderer..simpleText") || _jp.query(json, "$..lengthText..text").join("") || _jp.query(json, "$..thumbnailOverlayTimeStatusRenderer..text").join(""));
						var video = {
							title: _jp.value(json, "$..title..simpleText") || _jp.value(json, "$..title..text") || _jp.query(json, "$..title..text").join(""),
							videoId: _jp.value(json, "$..videoId"),
							listId,
							thumbnail: _normalizeThumbnail(_jp.value(json, "$..thumbnail..url")) || _normalizeThumbnail(_jp.value(json, "$..thumbnails..url")) || _normalizeThumbnail(_jp.value(json, "$..thumbnails")),
							duration,
							author: {
								name: _jp.value(json, "$..shortBylineText..runs[0]..text"),
								url: "https://youtube.com" + _jp.value(json, "$..shortBylineText..runs[0]..url")
							}
						};
						videos.push(video);
					});
					var plthumbnail = _normalizeThumbnail(_jp.value(json, "$..microformat..thumbnail..url")) || _normalizeThumbnail(_jp.value(json, "$..microformat..thumbnails..url")) || _normalizeThumbnail(_jp.value(json, "$..microformat..thumbnails"));
					var playlist = {
						title: _jp.value(json, "$..microformat..title"),
						listId,
						url: "https://youtube.com/playlist?list=" + listId,
						size: Number(size),
						views: Number(viewCount),
						date: _parsePlaylistLastUpdateTime(_jp.value(json, "$..sidebar.playlistSidebarRenderer.items[0]..stats[2]..simpleText") || _jp.query(json, "$..sidebar.playlistSidebarRenderer.items[0]..stats[2]..text").join("") || ""),
						image: plthumbnail || videos[0].thumbnail,
						thumbnail: plthumbnail || videos[0].thumbnail,
						videos,
						alertInfo,
						author: {
							name: _jp.value(json, "$..videoOwner..title..runs[0]..text"),
							url: "https://youtube.com" + _jp.value(json, "$..videoOwner..navigationEndpoint..url")
						}
					};
					callback && callback(null, playlist);
				}
				function _parsePlaylistLastUpdateTime(lastUpdateLabel) {
					debug("fn: _parsePlaylistLastUpdateTime");
					var DAY_IN_MS = 1e3 * 60 * 60 * 24;
					try {
						var words = lastUpdateLabel.toLowerCase().trim().split(/[\s.-]+/);
						if (words.length > 0) {
							if (words[words.length - 1].toLowerCase() === "yesterday") {
								var ms = Date.now() - DAY_IN_MS;
								var d = new Date(ms);
								if (d.toString() !== "Invalid Date") return _toInternalDateString(d);
							}
						}
						if (words.length >= 2) {
							if (words[0] === "updated" && words[2].slice(0, 3) === "day") {
								var _ms = Date.now() - DAY_IN_MS * words[1];
								var _d = new Date(_ms);
								if (_d.toString() !== "Invalid Date") return _toInternalDateString(_d);
							}
						}
						for (var i = 0; i < words.length; i++) {
							var slice = words.slice(i);
							var t = slice.join(" ");
							var r = slice.reverse().join(" ");
							var _a = new Date(t);
							var b = new Date(r);
							if (_a.toString() !== "Invalid Date") return _toInternalDateString(_a);
							if (b.toString() !== "Invalid Date") return _toInternalDateString(b);
						}
						return "";
					} catch (err) {
						return "";
					}
				}
				function _toInternalDateString(date) {
					date = new Date(date);
					debug("fn: _toInternalDateString");
					return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				}
				function _parseDuration(timestampText) {
					var a = timestampText.split(/\s+/);
					var timestamp = a[a.length - 1].replace(/[^:.\d]/g, "");
					if (!timestamp) return {
						toString: function toString() {
							return a[0];
						},
						seconds: 0,
						timestamp: 0
					};
					while ((_timestamp = timestamp[timestamp.length - 1]) !== null && _timestamp !== void 0 && _timestamp.match(/\D/)) {
						var _timestamp;
						timestamp = timestamp.slice(0, -1);
					}
					timestamp = timestamp.replace(/\./g, ":");
					var t = timestamp.split(/[:.]/);
					var seconds = 0;
					var exp = 0;
					for (var i = t.length - 1; i >= 0; i--) {
						if (t[i].length <= 0) continue;
						var number = t[i].replace(/\D/g, "");
						seconds += parseInt(number) * (exp > 0 ? Math.pow(60, exp) : 1);
						exp++;
						if (exp > 2) break;
					}
					return {
						toString: function toString() {
							return seconds + " seconds (" + timestamp + ")";
						},
						seconds,
						timestamp
					};
				}
				function _parseSubCountLabel(subCountLabel) {
					if (!subCountLabel) return void 0;
					var label = subCountLabel.split(/\s+/).filter(function(w) {
						return w.match(/\d/);
					})[0].toLowerCase();
					var m = label.match(/\d+(\.\d+)?/);
					if (m && m[0]) {} else return;
					var num = Number(m[0]);
					var THOUSAND = 1e3;
					var MILLION = THOUSAND * THOUSAND;
					if (label.indexOf("m") >= 0) return MILLION * num;
					if (label.indexOf("k") >= 0) return THOUSAND * num;
					return num;
				}
				function _parseNumbers(label) {
					if (!label) return [];
					var nums = label.split(/\s+/).filter(function(w) {
						return w.match(/\d/);
					}).map(function(l) {
						return l.toLowerCase();
					});
					var results = [];
					nums.forEach(function(n) {
						var m = n.match(/[-]?\d+(\.\d+)?/);
						if (m && m[0]) {} else return;
						var num = Number(m[0]);
						var THOUSAND = 1e3;
						var MILLION = THOUSAND * THOUSAND;
						if (n.indexOf("m") >= 0) num = MILLION * num;
						if (n.indexOf("k") >= 0) num = THOUSAND * num;
						results.push(num);
					});
					return results;
				}
				function _normalizeThumbnail(thumbnails) {
					if (!thumbnails) return void 0;
					var t;
					if (typeof thumbnails === "string") t = thumbnails;
					else {
						if (thumbnails.length) {
							t = thumbnails[0];
							return _normalizeThumbnail(t);
						}
						return;
					}
					t = t.split("?")[0];
					t = t.split("/default.jpg").join("/hqdefault.jpg");
					t = t.split("/default.jpeg").join("/hqdefault.jpeg");
					if (t.indexOf("//") === 0) return "https://" + t.slice(2);
					return t.split("http://").join("https://");
				}
				function _msToTimestamp(ms) {
					var t = "";
					var MS_HOUR = 1e3 * 60 * 60;
					var MS_MINUTE = 1e3 * 60;
					var MS_SECOND = 1e3;
					var h = Math.floor(ms / MS_HOUR);
					var m = Math.floor(ms / MS_MINUTE) % 60;
					var s = Math.floor(ms / MS_SECOND) % 60;
					if (h) t += h + ":";
					if (h && String(m).length < 2) t += "0";
					t += m + ":";
					if (String(s).length < 2) t += "0";
					t += s;
					return t;
				}
				function _parseVideoMetaDataTitle(idata) {
					return (_jp.query(idata, "$..videoPrimaryInfoRenderer.title..text").join("") || _jp.query(idata, "$..videoPrimaryInfoRenderer.title..simpleText").join("") || _jp.query(idata, "$..videoPrimaryRenderer.title..text").join("") || _jp.query(idata, "$..videoPrimaryRenderer.title..simpleText").join("") || _jp.value(idata, "$..title..text") || _jp.value(idata, "$..title..simpleText")).replace(/[\u0000-\u001F\u007F-\u009F\u200b]/g, "");
				}
				if (require.main === module$1) test("王菲 Faye Wong");
				function test(query) {
					console.log("test: doing list search");
					search({
						query,
						pageEnd: 1
					}, function(error, r) {
						if (error) throw error;
						var videos = r.videos;
						var playlists = r.playlists;
						var channels = r.channels;
						var topChannel = channels[0];
						console.log("videos: " + videos.length);
						console.log("playlists: " + playlists.length);
						console.log("channels: " + channels.length);
						console.log("topChannel.name: " + topChannel.name);
						console.log("topChannel.baseUrl: " + topChannel.baseUrl);
						console.log("topChannel.id: " + topChannel.id);
						console.log("topChannel.about: " + topChannel.about);
						console.log("topChannel.verified: " + topChannel.verified);
						console.log("topChannel.videoCount: " + topChannel.videoCount);
						console.log("topChannel.subCount: " + topChannel.subCount);
						console.log("topChannel.subCountLabel: " + topChannel.subCountLabel);
					});
				}
			}, {
				"./util.js": 2,
				"async.parallellimit": void 0,
				"cheerio": void 0,
				"dasu": void 0,
				"fs": void 0,
				"human-time": void 0,
				"jsonpath-plus": void 0,
				"path": void 0,
				"querystring": void 0,
				"url": void 0
			}],
			2: [function(require, module$2, exports$2) {
				"use strict";
				var _cheerio = require("cheerio");
				var util = {};
				module$2.exports = util;
				util._getScripts = _getScripts;
				util._findLine = _findLine;
				util._between = _between;
				function _getScripts(text) {
					var scripts = _cheerio.load(text)("script");
					var buffer = "";
					for (var i = 0; i < scripts.length; i++) {
						var el = scripts[i];
						var child = el && el.children[0];
						var data = child && child.data;
						if (data) buffer += data + "\n";
					}
					return buffer;
				}
				function _findLine(regex, text) {
					var cache = _findLine.cache || {};
					_findLine.cache = cache;
					cache[text] = cache[text] || {};
					var lines = cache[text].lines || text.split("\n");
					cache[text].lines = lines;
					clearTimeout(cache[text].timeout);
					cache[text].timeout = setTimeout(function() {
						delete cache[text];
					}, 100);
					for (var i = 0; i < lines.length; i++) {
						var line = lines[i];
						if (regex.test(line)) return line;
					}
					return "";
				}
				function _between(text, start, end) {
					var i = text.indexOf(start);
					var j = text.lastIndexOf(end);
					if (i < 0) return "";
					if (j < 0) return "";
					return text.slice(i, j + 1);
				}
			}, { "cheerio": void 0 }]
		}, {}, [1])(1);
	});
}));
//#endregion
export default require_yt_search();

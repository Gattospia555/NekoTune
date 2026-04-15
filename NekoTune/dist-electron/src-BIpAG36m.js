import { t as __commonJSMin } from "./chunk-olfrzTEO.js";
//#region node_modules/spotify-uri/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var src_exports = {};
	__export(src_exports, {
		Album: () => Album,
		Artist: () => Artist,
		Episode: () => Episode,
		Local: () => Local,
		Playlist: () => Playlist,
		Search: () => Search,
		Show: () => Show,
		Track: () => Track,
		User: () => User,
		formatEmbedURL: () => formatEmbedURL,
		formatOpenURL: () => formatOpenURL,
		formatPlayURL: () => formatPlayURL,
		formatURI: () => formatURI,
		parse: () => parse
	});
	module.exports = __toCommonJS(src_exports);
	function decode(str) {
		return decodeURIComponent(str.replace(/\+/g, " "));
	}
	function encode(str) {
		return encodeURIComponent(str).replace(/%20/g, "+").replace(/[!'()*]/g, escape);
	}
	var SpotifyUri = class {
		type;
		id;
		uri;
		constructor(uri, id, type) {
			this.uri = uri;
			this.id = id;
			this.type = type;
		}
		static is(v) {
			return typeof v === "object" && typeof v.uri === "string";
		}
		toURI() {
			return `spotify:${this.type}:${encode(this.id)}`;
		}
		toURL() {
			return `/${this.type}/${encode(this.id)}`;
		}
		toEmbedURL() {
			return `https://embed.spotify.com/?uri=${this.toURI()}`;
		}
		toOpenURL() {
			return `https://open.spotify.com${this.toURL()}`;
		}
		toPlayURL() {
			return `https://play.spotify.com${this.toURL()}`;
		}
	};
	var Local = class extends SpotifyUri {
		artist;
		album;
		track;
		seconds;
		constructor(uri, artist, album, track, seconds) {
			super(uri, "", "local");
			this.artist = artist;
			this.album = album;
			this.track = track;
			this.seconds = seconds;
		}
		static is(v) {
			return typeof v === "object" && v.type === "local";
		}
		toURI() {
			return `spotify:${this.type}:${encode(this.artist)}:${encode(this.album)}:${encode(this.track)}:${this.seconds}`;
		}
		toURL() {
			return `/${this.type}/${encode(this.artist)}/${encode(this.album)}/${encode(this.track)}/${this.seconds}`;
		}
	};
	var Search = class extends SpotifyUri {
		get query() {
			return this.id;
		}
		static is(v) {
			return typeof v === "object" && v.type === "search";
		}
	};
	var Playlist = class extends SpotifyUri {
		user;
		constructor(uri, id, user) {
			super(uri, id, "playlist");
			if (typeof user === "string") this.user = user;
		}
		static is(v) {
			return typeof v === "object" && v.type === "playlist";
		}
		toURI() {
			if (this.user !== void 0) {
				if (this.id === "starred") return `spotify:user:${encode(this.user)}:${encode(this.id)}`;
				return `spotify:user:${encode(this.user)}:playlist:${encode(this.id)}`;
			}
			return `spotify:playlist:${encode(this.id)}`;
		}
		toURL() {
			if (this.user !== void 0) {
				if (this.id === "starred") return `/user/${encode(this.user)}/${encode(this.id)}`;
				return `/user/${encode(this.user)}/playlist/${encode(this.id)}`;
			}
			return `/playlist/${encode(this.id)}`;
		}
	};
	var Artist = class extends SpotifyUri {
		static is(v) {
			return typeof v === "object" && v.type === "artist";
		}
	};
	var Album = class extends SpotifyUri {
		static is(v) {
			return typeof v === "object" && v.type === "album";
		}
	};
	var Track = class extends SpotifyUri {
		static is(v) {
			return typeof v === "object" && v.type === "track";
		}
	};
	var Episode = class extends SpotifyUri {
		static is(v) {
			return typeof v === "object" && v.type === "episode";
		}
	};
	var Show = class extends SpotifyUri {
		static is(v) {
			return typeof v === "object" && v.type === "show";
		}
	};
	var User = class extends SpotifyUri {
		get user() {
			return this.id;
		}
		static is(v) {
			return typeof v === "object" && v.type === "user";
		}
	};
	function parse(input) {
		const uri = SpotifyUri.is(input) ? input.uri : input;
		const { protocol, hostname, pathname = "/", searchParams } = new URL(uri);
		if (hostname === "embed.spotify.com") {
			const parsedQs = Object.fromEntries(searchParams);
			if (typeof parsedQs.uri !== "string") throw new Error("Parsed query string was not valid: " + searchParams.toString());
			return parse(parsedQs.uri);
		}
		if (protocol === "spotify:") return parseParts(uri, uri.split(":"));
		if (pathname === null) throw new TypeError("No pathname");
		return parseParts(uri, pathname.split("/"));
	}
	function parseParts(uri, parts) {
		parts = parts.filter((p) => !p.startsWith("intl"));
		let spotifyType = parts[1];
		if (spotifyType === "embed") {
			parts = parts.slice(1);
			spotifyType = parts[1];
		}
		const len = parts.length;
		if (spotifyType === "search") return new Search(uri, decode(parts.slice(2).join(":")), spotifyType);
		if (len >= 3 && spotifyType === "local") return new Local(uri, decode(parts[2]), decode(parts[3]), decode(parts[4]), +parts[5]);
		if (len >= 4 || spotifyType === "playlist") {
			if (len >= 5) return new Playlist(uri, decode(parts[4]), decode(parts[2]));
			if (parts[3] === "starred") return new Playlist(uri, "starred", decode(parts[2]));
			return new Playlist(uri, decode(parts[2]));
		}
		if (len === 3 && spotifyType === "user") return new User(uri, decode(parts[2]), spotifyType);
		if (spotifyType === "artist") return new Artist(uri, parts[2], spotifyType);
		if (spotifyType === "album") return new Album(uri, parts[2], spotifyType);
		if (spotifyType === "track") return new Track(uri, parts[2], spotifyType);
		if (spotifyType === "episode") return new Episode(uri, parts[2], spotifyType);
		if (spotifyType === "show") return new Show(uri, parts[2], spotifyType);
		throw new TypeError(`Could not determine type for: ${uri}`);
	}
	function formatURI(input) {
		return (typeof input === "string" ? parse(input) : input).toURI();
	}
	function formatEmbedURL(input) {
		return (typeof input === "string" ? parse(input) : input).toEmbedURL();
	}
	function formatOpenURL(input) {
		return (typeof input === "string" ? parse(input) : input).toOpenURL();
	}
	function formatPlayURL(input) {
		return (typeof input === "string" ? parse(input) : input).toPlayURL();
	}
}));
//#endregion
//#region node_modules/himalaya/lib/compat.js
var require_compat = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.arrayIncludes = arrayIncludes;
	exports.endsWith = endsWith;
	exports.isRealNaN = isRealNaN;
	exports.startsWith = startsWith;
	exports.stringIncludes = stringIncludes;
	function startsWith(str, searchString, position) {
		return str.substr(position || 0, searchString.length) === searchString;
	}
	function endsWith(str, searchString, position) {
		var index = (position || str.length) - searchString.length;
		var lastIndex = str.lastIndexOf(searchString, index);
		return lastIndex !== -1 && lastIndex === index;
	}
	function stringIncludes(str, searchString, position) {
		return str.indexOf(searchString, position || 0) !== -1;
	}
	function isRealNaN(x) {
		return typeof x === "number" && isNaN(x);
	}
	function arrayIncludes(array, searchElement, position) {
		var len = array.length;
		if (len === 0) return false;
		var lookupIndex = position | 0;
		var isNaNElement = isRealNaN(searchElement);
		var searchIndex = lookupIndex >= 0 ? lookupIndex : len + lookupIndex;
		while (searchIndex < len) {
			var element = array[searchIndex++];
			if (element === searchElement) return true;
			if (isNaNElement && isRealNaN(element)) return true;
		}
		return false;
	}
}));
//#endregion
//#region node_modules/himalaya/lib/lexer.js
var require_lexer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.copyPosition = copyPosition;
	exports["default"] = lexer;
	exports.feedPosition = feedPosition;
	exports.findTextEnd = findTextEnd;
	exports.isWhitespaceChar = isWhitespaceChar;
	exports.jumpPosition = jumpPosition;
	exports.lex = lex;
	exports.lexComment = lexComment;
	exports.lexSkipTag = lexSkipTag;
	exports.lexTag = lexTag;
	exports.lexTagAttributes = lexTagAttributes;
	exports.lexTagName = lexTagName;
	exports.lexText = lexText;
	exports.makeInitialPosition = makeInitialPosition;
	var _compat = require_compat();
	function feedPosition(position, str, len) {
		var start = position.index;
		var end = position.index = start + len;
		for (var i = start; i < end; i++) if (str.charAt(i) === "\n") {
			position.line++;
			position.column = 0;
		} else position.column++;
	}
	function jumpPosition(position, str, end) {
		return feedPosition(position, str, end - position.index);
	}
	function makeInitialPosition() {
		return {
			index: 0,
			column: 0,
			line: 0
		};
	}
	function copyPosition(position) {
		return {
			index: position.index,
			line: position.line,
			column: position.column
		};
	}
	function lexer(str, options) {
		var state = {
			str,
			options,
			position: makeInitialPosition(),
			tokens: []
		};
		lex(state);
		return state.tokens;
	}
	function lex(state) {
		var str = state.str, childlessTags = state.options.childlessTags;
		var len = str.length;
		while (state.position.index < len) {
			var start = state.position.index;
			lexText(state);
			if (state.position.index === start) if ((0, _compat.startsWith)(str, "!--", start + 1)) lexComment(state);
			else {
				var tagName = lexTag(state);
				var safeTag = tagName.toLowerCase();
				if ((0, _compat.arrayIncludes)(childlessTags, safeTag)) lexSkipTag(tagName, state);
			}
		}
	}
	var alphanumeric = /[A-Za-z0-9]/;
	function findTextEnd(str, index) {
		while (true) {
			var textEnd = str.indexOf("<", index);
			if (textEnd === -1) return textEnd;
			var _char2 = str.charAt(textEnd + 1);
			if (_char2 === "/" || _char2 === "!" || alphanumeric.test(_char2)) return textEnd;
			index = textEnd + 1;
		}
	}
	function lexText(state) {
		var type = "text";
		var str = state.str, position = state.position;
		var textEnd = findTextEnd(str, position.index);
		if (textEnd === position.index) return;
		if (textEnd === -1) textEnd = str.length;
		var start = copyPosition(position);
		var content = str.slice(position.index, textEnd);
		jumpPosition(position, str, textEnd);
		var end = copyPosition(position);
		state.tokens.push({
			type,
			content,
			position: {
				start,
				end
			}
		});
	}
	function lexComment(state) {
		var str = state.str, position = state.position;
		var start = copyPosition(position);
		feedPosition(position, str, 4);
		var contentEnd = str.indexOf("-->", position.index);
		var commentEnd = contentEnd + 3;
		if (contentEnd === -1) contentEnd = commentEnd = str.length;
		var content = str.slice(position.index, contentEnd);
		jumpPosition(position, str, commentEnd);
		state.tokens.push({
			type: "comment",
			content,
			position: {
				start,
				end: copyPosition(position)
			}
		});
	}
	function lexTag(state) {
		var str = state.str, position = state.position;
		var close = str.charAt(position.index + 1) === "/";
		var start = copyPosition(position);
		feedPosition(position, str, close ? 2 : 1);
		state.tokens.push({
			type: "tag-start",
			close,
			position: { start }
		});
		var tagName = lexTagName(state);
		lexTagAttributes(state);
		var _close = str.charAt(position.index) === "/";
		feedPosition(position, str, _close ? 2 : 1);
		var end = copyPosition(position);
		state.tokens.push({
			type: "tag-end",
			close: _close,
			position: { end }
		});
		return tagName;
	}
	var whitespace = /\s/;
	function isWhitespaceChar(_char3) {
		return whitespace.test(_char3);
	}
	function lexTagName(state) {
		var str = state.str, position = state.position;
		var len = str.length;
		var start = position.index;
		while (start < len) {
			var _char4 = str.charAt(start);
			if (!(isWhitespaceChar(_char4) || _char4 === "/" || _char4 === ">")) break;
			start++;
		}
		var end = start + 1;
		while (end < len) {
			var _char5 = str.charAt(end);
			if (!!(isWhitespaceChar(_char5) || _char5 === "/" || _char5 === ">")) break;
			end++;
		}
		jumpPosition(position, str, end);
		var tagName = str.slice(start, end);
		state.tokens.push({
			type: "tag",
			content: tagName
		});
		return tagName;
	}
	function lexTagAttributes(state) {
		var str = state.str, position = state.position, tokens = state.tokens;
		var cursor = position.index;
		var quote = null;
		var wordBegin = cursor;
		var words = [];
		var len = str.length;
		while (cursor < len) {
			var _char6 = str.charAt(cursor);
			if (quote) {
				if (_char6 === quote) quote = null;
				cursor++;
				continue;
			}
			if (_char6 === "/" || _char6 === ">") {
				if (cursor !== wordBegin) words.push(str.slice(wordBegin, cursor));
				break;
			}
			if (isWhitespaceChar(_char6)) {
				if (cursor !== wordBegin) words.push(str.slice(wordBegin, cursor));
				wordBegin = cursor + 1;
				cursor++;
				continue;
			}
			if (_char6 === "'" || _char6 === "\"") {
				quote = _char6;
				cursor++;
				continue;
			}
			cursor++;
		}
		jumpPosition(position, str, cursor);
		var wLen = words.length;
		var type = "attribute";
		for (var i = 0; i < wLen; i++) {
			var word = words[i];
			if (word.indexOf("=") === -1) {
				var secondWord = words[i + 1];
				if (secondWord && (0, _compat.startsWith)(secondWord, "=")) {
					if (secondWord.length > 1) {
						var newWord = word + secondWord;
						tokens.push({
							type,
							content: newWord
						});
						i += 1;
						continue;
					}
					var thirdWord = words[i + 2];
					i += 1;
					if (thirdWord) {
						var _newWord = word + "=" + thirdWord;
						tokens.push({
							type,
							content: _newWord
						});
						i += 1;
						continue;
					}
				}
			}
			if ((0, _compat.endsWith)(word, "=")) {
				var _secondWord = words[i + 1];
				if (_secondWord && !(0, _compat.stringIncludes)(_secondWord, "=")) {
					var _newWord2 = word + _secondWord;
					tokens.push({
						type,
						content: _newWord2
					});
					i += 1;
					continue;
				}
				var _newWord3 = word.slice(0, -1);
				tokens.push({
					type,
					content: _newWord3
				});
				continue;
			}
			tokens.push({
				type,
				content: word
			});
		}
	}
	var push = [].push;
	function lexSkipTag(tagName, state) {
		var str = state.str, position = state.position, tokens = state.tokens;
		var safeTagName = tagName.toLowerCase();
		var len = str.length;
		var index = position.index;
		while (index < len) {
			var nextTag = str.indexOf("</", index);
			if (nextTag === -1) {
				lexText(state);
				break;
			}
			var tagStartPosition = copyPosition(position);
			jumpPosition(tagStartPosition, str, nextTag);
			var tagState = {
				str,
				position: tagStartPosition,
				tokens: []
			};
			if (safeTagName !== lexTag(tagState).toLowerCase()) {
				index = tagState.position.index;
				continue;
			}
			if (nextTag !== position.index) {
				var textStart = copyPosition(position);
				jumpPosition(position, str, nextTag);
				tokens.push({
					type: "text",
					content: str.slice(textStart.index, nextTag),
					position: {
						start: textStart,
						end: copyPosition(position)
					}
				});
			}
			push.apply(tokens, tagState.tokens);
			jumpPosition(position, str, tagState.position.index);
			break;
		}
	}
}));
//#endregion
//#region node_modules/himalaya/lib/parser.js
var require_parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = parser;
	exports.hasTerminalParent = hasTerminalParent;
	exports.parse = parse;
	exports.rewindStack = rewindStack;
	var _compat = require_compat();
	function parser(tokens, options) {
		var root = {
			tagName: null,
			children: []
		};
		parse({
			tokens,
			options,
			cursor: 0,
			stack: [root]
		});
		return root.children;
	}
	function hasTerminalParent(tagName, stack, terminals) {
		var tagParents = terminals[tagName];
		if (tagParents) {
			var currentIndex = stack.length - 1;
			while (currentIndex >= 0) {
				var parentTagName = stack[currentIndex].tagName;
				if (parentTagName === tagName) break;
				if ((0, _compat.arrayIncludes)(tagParents, parentTagName)) return true;
				currentIndex--;
			}
		}
		return false;
	}
	function rewindStack(stack, newLength, childrenEndPosition, endPosition) {
		stack[newLength].position.end = endPosition;
		for (var i = newLength + 1, len = stack.length; i < len; i++) stack[i].position.end = childrenEndPosition;
		stack.splice(newLength);
	}
	function parse(state) {
		var tokens = state.tokens, options = state.options;
		var stack = state.stack;
		var nodes = stack[stack.length - 1].children;
		var len = tokens.length;
		var cursor = state.cursor;
		while (cursor < len) {
			var token = tokens[cursor];
			if (token.type !== "tag-start") {
				nodes.push(token);
				cursor++;
				continue;
			}
			var tagToken = tokens[++cursor];
			cursor++;
			var tagName = tagToken.content.toLowerCase();
			if (token.close) {
				var index = stack.length;
				var shouldRewind = false;
				while (--index > -1) if (stack[index].tagName === tagName) {
					shouldRewind = true;
					break;
				}
				while (cursor < len) {
					if (tokens[cursor].type !== "tag-end") break;
					cursor++;
				}
				if (shouldRewind) {
					rewindStack(stack, index, token.position.start, tokens[cursor - 1].position.end);
					break;
				} else continue;
			}
			var shouldRewindToAutoClose = (0, _compat.arrayIncludes)(options.closingTags, tagName);
			if (shouldRewindToAutoClose) {
				var terminals = options.closingTagAncestorBreakers;
				shouldRewindToAutoClose = !hasTerminalParent(tagName, stack, terminals);
			}
			if (shouldRewindToAutoClose) {
				var currentIndex = stack.length - 1;
				while (currentIndex > 0) {
					if (tagName === stack[currentIndex].tagName) {
						rewindStack(stack, currentIndex, token.position.start, token.position.start);
						nodes = stack[currentIndex - 1].children;
						break;
					}
					currentIndex = currentIndex - 1;
				}
			}
			var attributes = [];
			var attrToken = void 0;
			while (cursor < len) {
				attrToken = tokens[cursor];
				if (attrToken.type === "tag-end") break;
				attributes.push(attrToken.content);
				cursor++;
			}
			cursor++;
			var children = [];
			var position = {
				start: token.position.start,
				end: attrToken.position.end
			};
			var elementNode = {
				type: "element",
				tagName: tagToken.content,
				attributes,
				children,
				position
			};
			nodes.push(elementNode);
			if (!(attrToken.close || (0, _compat.arrayIncludes)(options.voidTags, tagName))) {
				var size = stack.push({
					tagName,
					children,
					position
				});
				var innerState = {
					tokens,
					options,
					cursor,
					stack
				};
				parse(innerState);
				cursor = innerState.cursor;
				if (stack.length === size) elementNode.position.end = tokens[cursor - 1].position.end;
			}
		}
		state.cursor = cursor;
	}
}));
//#endregion
//#region node_modules/himalaya/lib/format.js
var require_format = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.format = format;
	exports.formatAttributes = formatAttributes;
	exports.splitHead = splitHead;
	exports.unquote = unquote;
	function splitHead(str, sep) {
		var idx = str.indexOf(sep);
		if (idx === -1) return [str];
		return [str.slice(0, idx), str.slice(idx + sep.length)];
	}
	function unquote(str) {
		var car = str.charAt(0);
		var end = str.length - 1;
		if ((car === "\"" || car === "'") && car === str.charAt(end)) return str.slice(1, end);
		return str;
	}
	function format(nodes, options) {
		return nodes.map(function(node) {
			var type = node.type;
			var outputNode = type === "element" ? {
				type,
				tagName: node.tagName.toLowerCase(),
				attributes: formatAttributes(node.attributes),
				children: format(node.children, options)
			} : {
				type,
				content: node.content
			};
			if (options.includePositions) outputNode.position = node.position;
			return outputNode;
		});
	}
	function formatAttributes(attributes) {
		return attributes.map(function(attribute) {
			var parts = splitHead(attribute.trim(), "=");
			return {
				key: parts[0],
				value: typeof parts[1] === "string" ? unquote(parts[1]) : null
			};
		});
	}
}));
//#endregion
//#region node_modules/himalaya/lib/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = void 0;
	exports.formatAttributes = formatAttributes;
	exports.toHTML = toHTML;
	var _compat = require_compat();
	function formatAttributes(attributes, preferDoubleQuoteAttributes) {
		return attributes.reduce(function(attrs, attribute) {
			var key = attribute.key, value = attribute.value;
			if (value === null) return "".concat(attrs, " ").concat(key);
			var quote;
			if (preferDoubleQuoteAttributes) quote = value.indexOf("\"") !== -1 ? "'" : "\"";
			else quote = value.indexOf("'") !== -1 ? "\"" : "'";
			return "".concat(attrs, " ").concat(key, "=").concat(quote).concat(value).concat(quote);
		}, "");
	}
	function toHTML(tree, options) {
		return tree.map(function(node) {
			if (node.type === "text") return node.content;
			if (node.type === "comment") return "<!--".concat(node.content, "-->");
			var tagName = node.tagName, attributes = node.attributes, children = node.children;
			return (0, _compat.arrayIncludes)(options.voidTags, tagName.toLowerCase()) ? "<".concat(tagName).concat(formatAttributes(attributes, options.preferDoubleQuoteAttributes), ">") : "<".concat(tagName).concat(formatAttributes(attributes, options.preferDoubleQuoteAttributes), ">").concat(toHTML(children, options), "</").concat(tagName, ">");
		}).join("");
	}
	exports["default"] = { toHTML };
}));
//#endregion
//#region node_modules/himalaya/lib/tags.js
var require_tags = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.voidTags = exports.closingTags = exports.closingTagAncestorBreakers = exports.childlessTags = void 0;
	exports.childlessTags = [
		"style",
		"script",
		"template"
	];
	exports.closingTags = [
		"html",
		"head",
		"body",
		"p",
		"dt",
		"dd",
		"li",
		"option",
		"thead",
		"th",
		"tbody",
		"tr",
		"td",
		"tfoot",
		"colgroup"
	];
	exports.closingTagAncestorBreakers = {
		li: [
			"ul",
			"ol",
			"menu"
		],
		dt: ["dl"],
		dd: ["dl"],
		tbody: ["table"],
		thead: ["table"],
		tfoot: ["table"],
		tr: ["table"],
		td: ["table"]
	};
	exports.voidTags = [
		"!doctype",
		"area",
		"base",
		"br",
		"col",
		"command",
		"embed",
		"hr",
		"img",
		"input",
		"keygen",
		"link",
		"meta",
		"param",
		"source",
		"track",
		"wbr"
	];
}));
//#endregion
//#region node_modules/himalaya/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parse = parse;
	exports.parseDefaults = void 0;
	exports.stringify = stringify;
	var _lexer = _interopRequireDefault(require_lexer());
	var _parser = _interopRequireDefault(require_parser());
	var _format = require_format();
	var _stringify = require_stringify();
	var _tags = require_tags();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	var parseDefaults = {
		voidTags: _tags.voidTags,
		closingTags: _tags.closingTags,
		childlessTags: _tags.childlessTags,
		closingTagAncestorBreakers: _tags.closingTagAncestorBreakers,
		includePositions: false,
		preferDoubleQuoteAttributes: false
	};
	exports.parseDefaults = parseDefaults;
	function parse(str) {
		var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : parseDefaults;
		var tokens = (0, _lexer["default"])(str, options);
		var nodes = (0, _parser["default"])(tokens, options);
		return (0, _format.format)(nodes, options);
	}
	function stringify(ast) {
		var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : parseDefaults;
		return (0, _stringify.toHTML)(ast, options);
	}
}));
//#endregion
//#region node_modules/spotify-url-info/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var spotifyURI = require_dist();
	var { parse } = require_lib();
	var TYPE = {
		ALBUM: "album",
		ARTIST: "artist",
		EPISODE: "episode",
		PLAYLIST: "playlist",
		TRACK: "track"
	};
	var ERROR = {
		REPORT: "Please report the problem at https://github.com/microlinkhq/spotify-url-info/issues.",
		NOT_DATA: "Couldn't find any data in embed page that we know how to parse.",
		NOT_SCRIPTS: "Couldn't find scripts to get the data."
	};
	var SUPPORTED_TYPES = Object.values(TYPE);
	var throwError = (message, html) => {
		const error = /* @__PURE__ */ new TypeError(`${message}\n${ERROR.REPORT}`);
		error.html = html;
		throw error;
	};
	var parseData = (html) => {
		let scripts = parse(html).find((el) => el.tagName === "html");
		if (scripts === void 0) return throwError(ERROR.NOT_SCRIPTS, html);
		scripts = scripts.children.find((el) => el.tagName === "body").children.filter(({ tagName }) => tagName === "script");
		let script = scripts.find((script) => script.attributes.some(({ value }) => value === "resource"));
		if (script !== void 0) return normalizeData({ data: JSON.parse(Buffer.from(script.children[0].content, "base64")) });
		script = scripts.find((script) => script.attributes.some(({ value }) => value === "initial-state"));
		if (script !== void 0) {
			const data = JSON.parse(Buffer.from(script.children[0].content, "base64")).data.entity;
			return normalizeData({ data });
		}
		script = scripts.find((script) => script.attributes.some(({ value }) => value === "__NEXT_DATA__"));
		if (script !== void 0) {
			const string = Buffer.from(script.children[0].content);
			const data = JSON.parse(string).props.pageProps.state?.data.entity;
			if (data !== void 0) return normalizeData({ data });
		}
		return throwError(ERROR.NOT_DATA, html);
	};
	var createGetData = (fetch) => async (url, opts) => {
		const parsedUrl = getParsedUrl(url);
		return parseData(await (await fetch(spotifyURI.formatEmbedURL(parsedUrl), opts)).text());
	};
	function getParsedUrl(url) {
		try {
			const parsedURL = spotifyURI.parse(url);
			if (!parsedURL.type) throw new TypeError();
			return spotifyURI.formatEmbedURL(parsedURL);
		} catch (_) {
			throw new TypeError(`Couldn't parse '${url}' as valid URL`);
		}
	}
	var getImages = (data) => data.coverArt?.sources || data.images || data.visualIdentity.image;
	var getDate = (data) => data.releaseDate?.isoString || data.release_date;
	var getLink = (data) => spotifyURI.formatOpenURL(data.uri);
	function getArtistTrack(track) {
		return track.show ? track.show.publisher : [].concat(track.artists).filter(Boolean).map((a) => a.name).reduce((acc, name, index, array) => index === 0 ? name : acc + (array.length - 1 === index ? " & " : ", ") + name, "");
	}
	var getTracks = (data) => data.trackList ? data.trackList.map(toTrack) : [toTrack(data)];
	function getPreview(data) {
		const [track] = getTracks(data);
		const date = getDate(data);
		return {
			date: date ? new Date(date).toISOString() : date,
			title: data.name,
			type: data.type,
			track: track.name,
			description: data.description || data.subtitle || track.description,
			artist: track.artist,
			image: getImages(data)?.reduce((a, b) => a.width > b.width ? a : b)?.url,
			audio: track.previewUrl,
			link: getLink(data),
			embed: `https://embed.spotify.com/?uri=${data.uri}`
		};
	}
	var toTrack = (track) => ({
		artist: getArtistTrack(track) || track.subtitle,
		duration: track.duration,
		name: track.title,
		previewUrl: track.isPlayable ? track.audioPreview.url : void 0,
		uri: track.uri
	});
	var normalizeData = ({ data }) => {
		if (!data || !data.type || !data.name) throw new Error("Data doesn't seem to be of the right shape to parse");
		if (!SUPPORTED_TYPES.includes(data.type)) throw new Error(`Not an ${SUPPORTED_TYPES.join(", ")}. Only these types can be parsed`);
		data.type = data.uri.split(":")[1];
		return data;
	};
	module.exports = (fetch) => {
		const getData = createGetData(fetch);
		return {
			getLink,
			getData,
			getPreview: (url, opts) => getData(url, opts).then(getPreview),
			getTracks: (url, opts) => getData(url, opts).then(getTracks),
			getDetails: (url, opts) => getData(url, opts).then((data) => ({
				preview: getPreview(data),
				tracks: getTracks(data)
			}))
		};
	};
	module.exports.parseData = parseData;
	module.exports.throwError = throwError;
}));
//#endregion
export default require_src();

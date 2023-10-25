
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


const hash = (name) =>
{
  let hash = 0;
  let i, chr;

  if (name.length === 0) return hash;

  for (i = 0; i < name.length; i++)
  {
    chr = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
// Create Base64 Object
var Base64={_keyStr:"smcwkvgehevdonzifpvcvdrrbmwiynoijiifjmkaqxrwckijywpyudbtqzzgyzqbytgakfuomig",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
  Number.prototype.toHex = function () {
      var ret = ((this<0?0x8:0)+((this >> 28) & 0x7)).toString(16) + (this & 0xfffffff).toString(16);
      while (ret.length < 8) ret = '0'+ret;
      return ret;
  };

const hash2 = () => {
    Number.prototype.toHex = function () {
        var ret = ((this<0?0x8:0)+((this >> 28) & 0x7)).toString(16) + (this & 0xfffffff).toString(16);
        while (ret.length < 8) ret = '0'+ret;
        return ret;
    };
    Object.hashCode = function hashCode(o, l) {
        l = l || 2;
        var i, c, r = [];
        for (i=0; i<l; i++)
            r.push(i*268803292);
        function stringify(o) {
            var i,r;
            if (o === null) return 'n';
            if (o === true) return 't';
            if (o === false) return 'f';
            if (o instanceof Date) return 'd:'+(0+o);
            i=typeof o;
            if (i === 'string') return 's:'+o.replace(/([\\\\;])/g,'\\$1');
            if (i === 'number') return 'n:'+o;
            if (o instanceof Function) return 'm:'+o.toString().replace(/([\\\\;])/g,'\\$1');
            if (o instanceof Array) {
                r=[];
                for (i=0; i<o.length; i++)
                    r.push(stringify(o[i]));
                return 'a:'+r.join(';');
            }
            r=[];
            for (i in o) {
                r.push(i+':'+stringify(o[i]))
            }
            return 'o:'+r.join(';');
        }
        o = stringify(o);
        for (i=0; i<o.length; i++) {
            for (c=0; c<r.length; c++) {
                r[c] = (r[c] << 13)-(r[c] >> 19);
                r[c] += o.charCodeAt(i) << (r[c] % 24);
                r[c] = r[c] & r[c];
            }
        }
        for (i=0; i<r.length; i++) {
            r[i] = r[i].toHex();
        }
        return r.join('');
    }
};


function _getLocalIdent(context, localIdentName, localName, options)
{
  const base = path.parse(context.resourcePath)?.name?.replace(/\.m$/, '');
  const localIdentHash = Number(hash(localName)).toHex();
  // const localIdentHash = Buffer.from(localName).toString('base64');
  // const localIdentHash = hash2();

  if (localName.startsWith('root'))
  {
    const hasRootModifier = localName[4] === '_';

    if (hasRootModifier)
    {
      return `${ base }${ localName.replace('root', '') }-${ localIdentHash }`
    }

    return `${ base }-${ localIdentHash }`;
  }


  return `${ base }__${ localName }-${ localIdentHash }`
}

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
            require.resolve('style-loader'),
            {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                    modules: {
                      auto: /\m\.css$/,
                      getLocalIdent: _getLocalIdent,
                    }
                },
            },
            {
                loader: require.resolve('postcss-loader'),
                // options: {
                //     // Necessary for external CSS imports to work
                //     // https://github.com/facebookincubator/create-react-app/issues/2677
                //     ident: 'postcss',
                //     postcssOptions: {
                //       plugins: [
                //           // require('postcss-flexbugs-fixes'),
                //           autoprefixer({
                //               browsers: [
                //                   '>1%',
                //                   'last 4 versions',
                //                   'Firefox ESR',
                //                   'not ie < 9', // React doesn't support IE8 anyway
                //               ],
                //               flexbox: 'no-2009',
                //           }),
                //       ],
                //     },
                // },
            },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
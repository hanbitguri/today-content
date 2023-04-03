const path = require('path') 
// Node.js 의 빌트인 객체 'path' , 경로를 사용할때 유용하다.

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports={
    mode:'development',  
    resolve: {
        extensions: ['.js', '.jsx','.tsx'], 
      },
    entry: './src/index.js' 
    ,
    output:{
        path:path.resolve('./dist'), 
        filename:'bundle.[hash].js'
    },
    module:{  
        rules:[
            {
                test:/\.css$/, 
                use:['style-loader','css-loader']
            },
            {
                test:/\.png$/,
                use:[
                    {
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]?[hash]'
                    }
                    }
            ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/', 
                use:[
                    {
                        loader:'babel-loader',
                    },
                ]
              },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true, 
        //historyApiFallback: true,
        hot: true, 
      },

}
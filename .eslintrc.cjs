/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@electron-toolkit',
        '@electron-toolkit/eslint-config-ts/eslint-recommended',
        '@vue/eslint-config-typescript/recommended',
    ],
    rules: {
        // 基础规则
        '@typescript-eslint/no-explicit-any': 'off',           // 忽略使用 any 类型的错误
        'no-debugger': 'warn',                                 // debugger
        'no-console': 'warn',                                  // console
        'prefer-arrow-callback': 'warn',                       // 优先使用箭头函数
        'quotes': ['warn', 'single'],                          // 引号
        'max-len': ['warn', {
            'code': 80,
            'ignoreUrls': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
            'ignoreRegExpLiterals': true,
        }],                                                     // 单行长度
        // Vue 相关规则
        'vue/html-closing-bracket-spacing': ['warn', {
            'startTag': 'never',
            'endTag': 'never',
            'selfClosingTag': 'always'
        }],                                                     // html 标签闭合
        'vue/html-closing-bracket-newline': ['warn', {
            'multiline': 'never'
        }],                                                     // html 标签换行
        'vue/max-attributes-per-line': ['warn', {
            'singleline': 5
        }],                                                     // html 属性换行
        'vue/html-quotes': [ 'warn',
            'double',
            { 'avoidEscape': true }
        ],                                                      // html 引号
        'vue/v-for-delimiter-style': ['error', 'in'],         // v-for 分隔符
        'vue/require-name-property': 'warn',                  // 组件 name 属性
        'vue/prefer-true-attribute-shorthand': 'warn',        // 属性简写
        'vue/require-prop-types': 'off',                      // prop 类型
        'vue/no-v-html': 'off',                               // v-html
    },
}

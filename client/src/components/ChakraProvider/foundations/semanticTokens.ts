const semanticTokens = {
    colors: {
        "black": { default: '#0d1012', _dark: '#ffffff' },

        accent: { default: '#7b7d7e', _dark: '#a5a6a7' },
        'accent-static': '#7b7d7e',
        'accent-secondary': { default: '#e0e0e0', _dark: '#454849' },

        'accent-sub': { default: '#f7f7f7', _dark: '#565656' },
        'accent-emphasis': { default: '#313435', _dark: '#f7f7f7' },

        'bg-dialog' : {default: '#f9fafa',_dark:'#1c1f25'},

        'primary-gradient': 'linear-gradient(to right,#ffb444,#eb6f3a)',
        'primary-hover': '#eb6f3a',
        'primary-active': '#b25127',

        fg: { default: '#313435', _dark: '#e0e0e0' },
        'fg-secondary': { default: '#686a6b', _dark: '#a5a6a7' },
        'fg-on-accent': { default: '#ffffff', _dark: '#535556' },
        'fg-sub': { default: '#7b7d7e', _dark: '#939495' },
        'fg-emphasis': { default: '#0e1012', _dark: '#f7f7f7' },

        'box-border' : {default: '#e0e0e0',_dark: '#282c34'},

        card: { default: 'rgba(0, 0, 0, 0.05)', _dark: 'rgba(255, 255, 255, 0.08)' },
        'card-sub': {default: '#e0e0e0',_dark: '#282c34'}
    },
    shadows: {
        sh: { default: '0px 5px 0px 0px #e0e0e0', _dark: '0px 5px 0px 0px #454849' },
        "sh-hover": { default: '0px 3px 0px 0px #e0e0e0', _dark: '0px 3px 0px 0px #454849' },
        "sh-btn-black": {default: "0px 5px 0px 0px #e0e0e0", _dark :'0px 5px 0px 0px #2d2d2d' },
        "sh-btn-black-hover": {default: "0px 3px 0px 0px #e0e0e0", _dark :'0px 3px 0px 0px #2d2d2d' }
    }
}

export default semanticTokens
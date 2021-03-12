const show = VGSShow.create('tntvrf6mlhu', function(state) {
  if (state['data-text'].revealed) {
    document.getElementById('reveal').style.display = 'none'
    document.getElementById('masked-card-number').style.display = 'none';

    document.getElementById('copy').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
    
    document.getElementById('secret-card-number').classList = 'cc-number' 
  }
});
const button = document.getElementById('reveal');
const reset = document.getElementById('reset');

reset.addEventListener('click', () => {
  document.getElementById('copy').style.display = 'none';
  document.getElementById('reset').style.display = 'none';
  document.getElementById('secret-card-number').classList = 'cc-number --hidden' 
  document.getElementById('secret-card-number').innerHTML = ''

  document.getElementById('masked-card-number').style.display = 'block';
  button.style.display = 'block';
  button.innerHTML = 'Reveal Data';
  document.getElementById('copy').innerHTML = '';
})

button.addEventListener('click', () => {
  // console.log('qweqwe');
  button.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
      <g fill="none" fill-rule="evenodd" stroke-width="2">
          <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                  begin="0s" dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                  begin="0s" dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="1">
              <animate attributeName="r"
                  begin="-0.9s" dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite" />
              <animate attributeName="stroke-opacity"
                  begin="-0.9s" dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite" />
          </circle>
      </g>
  </svg>
  `
  
  
  const cardNumber = show.request({
    name: 'data-text',
    method: 'POST',
    path: '/post',
    payload: {'card_number': 'tok_sandbox_buH88U6sx9KqhTwvvGfhcK'},
    htmlWrapper: 'text',
    headers: {
      'auth-header': 'test',
    },
    serializers: [show.SERIALIZERS.replace('(\\d{4})(\\d{4})(\\d{4})(\\d{4})', '$1 $2 $3 $4')],
    jsonPathSelector: 'json.card_number',
  });


  cardNumber.render('#secret-card-number', {
    '@font-face': { 
      'font-family': 'PT Mono',
      'font-style': 'normal',
      'font-weight': '400',
      
      'font-display': 'swap',
      'src': 'local("PT Mono"), local("PTMono-Regular")          url(https://fonts.gstatic.com/s/ptmono/v7/9oRONYoBnWILk-9AnCszM_HxEcn7Hg.woff2) format("woff2")',
      'unicode-range': 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'
    },
    'font-family': '"PT Mono", monospace',
    'color': 'white',
    'font-size': '28px',
  });

  const copyBtn = show.copyFrom(cardNumber,
    {
      text: 'Copy',
      serializers: [show.SERIALIZERS.replace(' ', '')],
    },
    function (status) {
      if (status === 'success') {
        alert('Copied!');
      }
  });
  
  const css = `
    margin-top: 16px;
    width: 100%;
    line-height: 40px;
    background-color: rgb(7, 25, 58);
    color: #fff;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    }
  `
  copyBtn.render('#copy', {
   css 
  });
});




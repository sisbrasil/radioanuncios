import { AdCode, Stream } from './types';

export const WHATSAPP_NUMBER = "5516996418900";

export const STREAMS: Stream[] = [
  { 
    id: 1, 
    name: "WebRadio Principal", 
    description: "O melhor da música 24h por dia",
    url: "https://stream.zeno.fm/cldwactvjlgtv" 
  },
  // Example of a second stream if needed in the future
  // { 
  //   id: 2, 
  //   name: "WebRadio Sertanejo", 
  //   description: "Modão e lançamentos",
  //   url: "https://stream.zeno.fm/another-stream-id" 
  // },
];

export const AD_CODES: AdCode[] = [
  { 
    id: "ad-top", 
    title: "Banner Topo (728x90)", 
    code: '<!-- Ad Unit: Header_Leaderboard --><div id="ad-header-slot"></div><script>/* Ad Script Here */</script>' 
  },
  { 
    id: "ad-side", 
    title: "Barra Lateral (300x250)", 
    code: '<!-- Ad Unit: Sidebar_Rectangle --><div id="ad-sidebar-slot"></div><script>/* Ad Script Here */</script>' 
  },
  { 
    id: "ad-footer", 
    title: "Rodapé Fixo (320x50 Mobile)", 
    code: '<!-- Ad Unit: Footer_Sticky --><div id="ad-footer-sticky"></div><script>/* Ad Script Here */</script>' 
  }
];

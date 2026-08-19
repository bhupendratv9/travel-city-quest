import Script from "next/script";

export default function AnalyticsScripts() {
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MG95PSH');`}
      </Script>

      <Script id="comscore" strategy="afterInteractive">
        {`var _comscore = _comscore || [];
_comscore.push({ c1:"2", c2:"33425927",
  options: {
    enableFirstPartyCookie: true,
    bypassUserConsentRequirementFor1PCookie: true
  }});
(function() {
  var s = document.createElement("script"), el = document.getElementsByTagName("script")[0];
  s.async = true;
  s.src = "https://sb.scorecardresearch.com/cs/33425927/beacon.js";
  el.parentNode.insertBefore(s, el);
})();`}
      </Script>

      <Script id="chartbeat" strategy="afterInteractive">
        {`(function() {
  var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
  _sf_async_config.uid = 67051;
  _sf_async_config.domain = 'tv9hindi.com';
  _sf_async_config.flickerControl = false;
  _sf_async_config.useCanonical = true;
  _sf_async_config.useCanonicalDomain = true;
  _sf_async_config.sections = 'city-quest';
  _sf_async_config.authors = 'TV9 Bharatvarsh';

  function loadChartbeat() {
    var e = document.createElement('script');
    var n = document.getElementsByTagName('script')[0];
    e.type = 'text/javascript';
    e.async = true;
    e.src = '//static.chartbeat.com/js/chartbeat.js';
    n.parentNode.insertBefore(e, n);
  }

  setTimeout(function(){ loadChartbeat(); }, 6000);
})();`}
      </Script>

      <Script
        id="chartbeat-mab"
        src="https://static.chartbeat.com/js/chartbeat_mab.js"
        strategy="afterInteractive"
      />
    </>
  );
}

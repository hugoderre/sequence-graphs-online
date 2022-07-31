import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<meta name="description" content="This web app allow you to configure and visualize sequence graphs like collatz, fibonacci and more." />
				<link rel="icon" href="/favicon.ico" />

				{/* Facebook */}
				<meta property="og:image" content="https://sequence-graphs.com/meta-img.png"/>
				<meta property="og:title" content="Sequence Graphs Online" />
				<meta property="og:description" content="This web app allow you to configure and visualize sequence graphs like collatz, fibonacci and more." />
				<meta property="og:url" content="https://sequence-graphs.com/meta-img.png"/>
				<meta property="og:type" content="website" />

				{/* Twitter */}
				<meta name="twitter:image" content="https://sequence-graphs.com/meta-img.png"/>
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Sequence Graphs Online" />
				<meta name="twitter:description" content="This web app allow you to configure and visualize sequence graphs like collatz, fibonacci and more." />
				<meta name="twitter:creator" content="@devgohu" />

				{/* Global Site Tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
							page_path: window.location.pathname,
							});
						`,
					}}
				/>

				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
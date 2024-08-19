import SiteInformation from '../types/CmsSingleTypes/siteInformation'
import SiteInfoLocal from '@/data/siteInfo'
import AboutUsData from '@/data/aboutUs'
import ContactUsData from '@/data/contactPage'

const baseUrl = 'https://web-hosting-291602.uk.r.appspot.com/api/'

const getData = async (endpoint: string) => {
	switch (endpoint) {
		case 'about-us-page':
			return AboutUsData
		case 'contact-page':
			return ContactUsData
		default:
			break
	}

	let data = (await (await fetch(baseUrl + endpoint)).json()).data

	if (Array.isArray(data)) {
		data = data.map((d) => ({ ...d.attributes, id: d.id }))
	} else {
		data = { ...data.attributes, id: data.id }
	}

	return data
}

export const getSiteInfo = async (): Promise<SiteInformation> => {
	// const [siteInfo, siteInfoWithShareImage] = await Promise.all([
	// 	getData('site-information?populate=*'),
	// 	getData('site-information?populate=globalSeo.shareImage'),
	// ])

	// return {
	// 	...siteInfo,
	// 	globalSeo: siteInfoWithShareImage.globalSeo,
	// }

	return {
		...SiteInfoLocal
	}
}

export default getData

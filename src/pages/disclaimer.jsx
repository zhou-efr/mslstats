import { Container } from '@/components/Container'
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

export default function Example() {
    return (
        <Container>

            <div className="bg-white px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                    <p className="text-base font-semibold leading-7 text-indigo-600">Disclaimer</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy and security notice</h1>
                    <p className="mt-6 text-xl leading-8">
                        Dans ce disclaimer, je vais aborder quelques points qui me semblent nécessaires à clarifier, dont certains pour être
                        en simili conformité avec le RGPD (t{"'"}inquiète, rien de trop bullshit, juste des informations qui peuvent être utiles).
                    </p>
                    <div className="mt-10 max-w-2xl">
                        <p className='mb-3'>
                            Pour commencer, ce site vise à partager des statistiques sans aucun sérieux. À aucun moment je ne souhaite que cela
                            devienne une source de toxicité. Ainsi, je me réserve le droit de supprimer à tout moment l{"'"}espace statistiques sur
                            décision personnelle ou demande explicite de la modération de stream.
                        </p>
                        <p className='my-3'>
                            En outre, vous aurez peut-être remarqué que le site dispose d{"'"}un bouton {'"'}login{'"'}. Afin de partager publiquement le
                            site tout en conservant une interface d{"'"}administration, j{"'"}ai implémenté un système d{"'"}authentification. Celui-ci a
                            évolué pour un système libre-service permettant à chacun d{"'"}afficher les streams de son choix sur la page d{"'"}accueil.
                        </p>
                        <p className='my-3'>
                            Pour parvenir à cela, l'authentification est gérée par un plan gratuit Auth0
                            (<a className='text-indigo-500 hover:text-indigo-700 active:text-pink-900' href="https://www.okta.com/privacy-policy/">lien RGPD</a>). Est ensuite sauvegardé dans une base de données
                            MongoDB Atlas (<a className='text-indigo-500 hover:text-indigo-700 active:text-pink-900' href="https://www.mongodb.com/legal/privacy-policy">lien RGPD</a>) la liste des streamers suivis au même titre
                            que l{"'"}email fourni à l{"'"}inscription.
                        </p>
                        <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                            <li className="flex gap-x-3">
                                <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                <span>
                                    <strong className="font-semibold text-gray-900">La liste des streamers</strong> suivis par un utilisateur est
                                    utilisée pour récupérer la liste des streams à afficher sur la page d{"'"}accueil. Cette liste est directement
                                    récupérée auprès de Twitch via son API (<a className='text-indigo-500 hover:text-indigo-700 active:text-pink-900' href="https://www.twitch.tv/p/en/legal/privacy-notice/">lien RGPD</a>).
                                    La liste des streamers est fournie par l{"'"}utilisateur depuis l{"'"}onglet Paramètres.
                                </span>
                            </li>
                            <li className="flex gap-x-3">
                                <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                <span>
                                    <strong className="font-semibold text-gray-900">L{"'"}email de l{"'"}utilisateur</strong> est utilisé afin de relier
                                    l{"'"}authentification à la liste des streamers suivis dans l{"'"}application.
                                </span>
                            </li>
                        </ul>
                        <p className="mt-8">
                            Ces données sont uniquement utilisées par l{"'"}application Web MSL Stats et ne sont en aucun cas partagées avec d{"'"}autres
                            services que ceux précédemment mentionnés.
                        </p>
                        <p className="mt-3">
                            TODO: liste des autres donnees, SSO Google, et lien vers le gihub
                        </p>
                        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Au sujet de la sécurité</h2>
                        <p className="mt-6">
                            WIP
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

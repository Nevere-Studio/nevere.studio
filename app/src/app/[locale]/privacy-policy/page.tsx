import s from './page.module.scss';
import { useTranslations } from 'next-intl';
import useRichText from '@/i18n/useRichText';

function PrivacyPolicy() {
    const t = useTranslations('privacy_policy.content');
    const rt = useRichText(t);

    return (
        <article className={s.PrivacyPolicy}>
            <section className={s.Intro}>
                <h1>{ rt('h1') }</h1>
                <p>{ rt('effective_date') }</p>
                <p>{ rt('last_updated')   }</p>
                <p>{ rt('intro.0') }</p>
                <p>{ rt('intro.1') }</p>
            </section>

            <ol>
                <li className={s.WhoWeAre}>
                    <h2><span className={s.num}>1.</span> { rt('who_we_are.heading') }</h2>
                    <h3>{ rt('who_we_are.intro')   }</h3>
                    <ul>
                        <li>{ rt('who_we_are.brand')    }</li>
                        <li>{ rt('who_we_are.founder')  }</li>
                        <li>{ rt('who_we_are.location') }</li>
                        <li>{ rt('who_we_are.email')    }</li>
                        <li>{ rt('who_we_are.website')  }</li>
                        <li>{ rt('who_we_are.ps')       }</li>
                    </ul>
                </li>

                <section className={s.WhatAndHow}>
                    <h2><span className={s.num}>2.</span> { rt('what_and_how.heading') }</h2>
                    <p>{ rt('what_and_how.intro') }</p>

                    <h3><span className={s.num}>A.</span> { rt('what_and_how.contact.heading') }</h3>
                    <p>{ rt('what_and_how.contact.intro') }</p>
                    <ul>
                        <li>{ rt('what_and_how.contact.intro')               }</li>
                        <li>{ rt('what_and_how.contact.data_collected')      }</li>
                        <li>{ rt('what_and_how.contact.why')                 }</li>
                        <li>{ rt('what_and_how.contact.legal_basis')         }</li>
                        <li>{ rt('what_and_how.contact.how_long_we_keep_it') }</li>
                    </ul>

                    <h3><span className={s.num}>B.</span> { rt('what_and_how.analytics.heading') }</h3>
                    <p>{ rt('what_and_how.analytics.intro') }</p>
                    <ul>
                        <li>{ rt('what_and_how.analytics.data_collected')      }</li>
                        <li>{ rt('what_and_how.analytics.why')                 }</li>
                        <li>{ rt('what_and_how.analytics.analytics_providers') }</li>
                        <li>{ rt('what_and_how.analytics.legal_basis')         }</li>
                    </ul>
                </section>

                <section className={s.CookiesAndTracking}>
                    <h2><span className={s.num}>3.</span> { t('cookies_and_tracking.heading') }</h2>
                    <p>{ rt('cookies_and_tracking.intro') }</p>
                    <ul>
                        <li>{ rt('cookies_and_tracking.essential_cookies') }</li>
                        <li>{ rt('cookies_and_tracking.analytics_cookies') }</li>
                    </ul>
                    <p>{ rt('cookies_and_tracking.outro') }</p>
                </section>

                <section className={s.WhoWeShareDataWith}>
                    <h2><span className={s.num}>4.</span> { rt('who_we_share_data_with.heading') }</h2>
                    <p>{ rt('who_we_share_data_with.intro') }</p>
                    <ul>
                        <li>{ rt('who_we_share_data_with.hosting_and_cdn')         }</li>
                        <li>{ rt('who_we_share_data_with.email_and_communication') }</li>
                        <li>{ rt('who_we_share_data_with.analytics')               }</li>
                    </ul>
                    <p>{ rt('who_we_share_data_with.outro') }</p>
                </section>

                <section className={s.WhereDataIsStored}>
                    <h2><span className={s.num}>5.</span> { rt('where_data_is_stored.heading') }</h2>
                    <p>{ rt('where_data_is_stored.content') }</p>
                </section>

                <section className={s.DataRights}>
                    <h2><span className={s.num}>6.</span> { rt('data_rights.heading') }</h2>
                    <p>{ rt('data_rights.intro') }</p>
                    <ul>
                        <li>{ rt('data_rights.right_to_access')             }</li>
                        <li>{ rt('data_rights.right_to_rectification')      }</li>
                        <li>{ rt('data_rights.right_to_erasure')            }</li>
                        <li>{ rt('data_rights.right_to_restrict_or_object') }</li>
                        <li>{ rt('data_rights.right_to_data_portability')   }</li>
                        <li>{ rt('data_rights.right_to_complaint')          }</li>
                    </ul>
                    <p>{ rt('data_rights.outro') }</p>
                </section>

                <section className={s.DataSecurity}>
                    <h2><span className={s.num}>7.</span> { rt('data_security.heading') }</h2>
                    <p>{ rt('data_security.content') }</p>
                </section>

                <section className={s.Updates}>
                    <h2><span className={s.num}>8.</span> { rt('updates.heading') }</h2>
                    <p>{ rt('updates.content') }</p>
                </section>
            </ol>
        </article>
    );
}

export default PrivacyPolicy;
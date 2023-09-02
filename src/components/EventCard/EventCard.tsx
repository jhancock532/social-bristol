import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { EventLocation, EventTime } from '@/types/types';
import { get24HourTimeFromDateString } from '@/utils/utils';

import { ClockIcon } from '@/components/Icons/ClockIcon';
import { WalletIcon } from '@/components/Icons/WalletIcon';
import { LocationIcon } from '@/components/Icons/LocationIcon';
import { ReceiptIcon } from '@/components/Icons/ReceiptIcon';
import { ExternalIcon } from '../Icons/ExternalIcon';
import { ExpandIcon } from '../Icons/ExpandIcon';
import { ArrowIcon } from '../Icons/ArrowIcon';

import styles from './EventCard.module.scss';

const Map = dynamic(() => import('../Map/index'), { ssr: false });

type EventCardProps = {
    name: string;
    description: string;
    slug: string;
    cost: number;
    time: EventTime;
    location: EventLocation;
    bookingRequired: boolean;
};

const EventCard = ({
    name,
    description,
    slug,
    cost,
    time,
    location,
    bookingRequired,
}: EventCardProps) => {
    const [showMap, setShowMap] = React.useState(false);

    return (
        <div className={styles.container}>
            <Link href={`/events/${slug}`} className={styles.title__link}>
                <h2 className={styles.title}>{name}</h2>
            </Link>

            <p className={styles.description}>{description}</p>

            <div className={styles.details}>
                <div className={styles.details__item}>
                    <ClockIcon className={styles.details__icon} />
                    <p>
                        Every <strong>{time.weekday}</strong> from{' '}
                        <strong>
                            {get24HourTimeFromDateString(time.start)}
                        </strong>{' '}
                        to{' '}
                        <strong>{get24HourTimeFromDateString(time.end)}</strong>
                    </p>
                </div>
                <div className={styles.details__item}>
                    <WalletIcon className={styles.details__icon} />
                    <p>
                        Costs <strong>£{cost}</strong> per session
                    </p>
                </div>
                <div className={styles.details__item}>
                    <ReceiptIcon className={styles.details__icon} />
                    <p>
                        {bookingRequired
                            ? 'Advance booking required'
                            : 'No advance booking required'}
                    </p>
                </div>
                <div className={styles.details__item}>
                    <LocationIcon className={styles.details__icon} />
                    <div className={styles.locationContainer}>
                        <p>
                            Located at <strong>{location.address}</strong>
                        </p>
                        <button
                            className={styles.toggleMapButton}
                            onClick={() => setShowMap(!showMap)}
                        >
                            {showMap ? 'Hide map' : 'Show map'}
                            <ExpandIcon
                                className={styles.toggleMapButton__icon}
                                pointDownwards={!showMap}
                            />
                        </button>
                    </div>
                </div>

                {showMap && (
                    <>
                        <Map
                            longitude={parseFloat(location.longitude)}
                            latitude={parseFloat(location.latitude)}
                            address={location.address}
                        />
                        <a
                            className={styles.googleMapsLink}
                            href={location.googleMapsLink}
                        >
                            Open in Google Maps <ExternalIcon />
                        </a>
                    </>
                )}
            </div>

            <Link href={`/events/${slug}`} className={styles.eventDetailsLink}>
                See more event details
                <ArrowIcon className={styles.eventDetailsLink__icon} />
            </Link>
        </div>
    );
};

export default EventCard;
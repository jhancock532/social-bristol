import React from 'react';
import fs from 'fs';
import { join } from 'path';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import Layout from '@/components/Layout';
import Metadata from '@/components/Metadata';
import { getDirectories } from '@/utils/utils';
import styles from './Index.module.scss';

const generateListOfGroupTags = (events: any) => {
    interface TagsObject {
        [key: string]: number;
    }

    let tags: TagsObject = {};

    for (let i = 0; i < events.length; i += 1) {
        if (events[i].tags) {
            for (let j = 0; j < events[i].tags.length; j += 1) {
                if (!Object.keys(tags).includes(events[i].tags[j])) {
                    tags[events[i].tags[j]] = 1;
                } else {
                    tags[events[i].tags[j]] += 1;
                }
            }
        }
    }

    return tags;
};

export default function Home({ events }: any) {
    const [selectedGroupTags, setSelectedGroupTags] = React.useState<string[]>(
        [],
    );

    const groupTags = generateListOfGroupTags(events);

    const handleGroupFilterClicked = (tag: string) => {
        if (selectedGroupTags.includes(tag)) {
            const indexOfTag = selectedGroupTags.indexOf(tag);
            selectedGroupTags.splice(indexOfTag, 1);
            setSelectedGroupTags([...selectedGroupTags]);
        } else {
            setSelectedGroupTags([tag, ...selectedGroupTags]);
        }
    };

    const filteredEvents =
        selectedGroupTags.length > 0
            ? events.filter((event: any) => {
                  for (let i = 0; i < event.tags.length; i += 1) {
                      if (selectedGroupTags.includes(event.tags[i])) {
                          return true;
                      }
                  }
                  return false;
              })
            : events;

    return (
        <Layout>
            <Metadata
                title="Social Bristol"
                description="A list of social groups in Bristol that meet up regularly and are open to newcomers."
            />
            <div className={styles.hero}>
                <h1 className={styles.title}>Social Bristol</h1>
                <p className={styles.description}>
                    Welcome to Social Bristol! This website lists social groups
                    in Bristol that meet up regularly and are open to newcomers
                    - it&apos;s a{' '}
                    <Link className={styles.link} href="/about">
                        work in progress site
                    </Link>
                    , with more groups still to be listed. Filter groups by tag
                    with the options below, or{' '}
                    <Link className={styles.link} href="/map">
                        view all the groups on a map
                    </Link>
                    .
                </p>
                <div className={styles.groupFilterOptionsContainer}>
                    <div className={styles.groupTagFilterContainer}>
                        <p className={styles.groupFilterTitle}>
                            Filter by tags
                        </p>
                        <div className={styles.groupTagsContainer}>
                            {Object.keys(groupTags).map(
                                (tag: string, index: number) => (
                                    <div
                                        key={index}
                                        className={styles.groupTagFilter}
                                    >
                                        <input
                                            type="checkbox"
                                            id={`group-tag-checkbox-${tag}`}
                                            checked={selectedGroupTags.includes(
                                                tag,
                                            )}
                                            onChange={() =>
                                                handleGroupFilterClicked(tag)
                                            }
                                            className={
                                                styles.groupTagFilter__checkbox
                                            }
                                        />
                                        <label
                                            htmlFor={`group-tag-checkbox-${tag}`}
                                            className={
                                                styles.groupTagFilter__label
                                            }
                                        >
                                            {`${tag} (${groupTags[tag]})`}
                                        </label>
                                    </div>
                                ),
                            )}
                        </div>
                        <button
                            className={styles.clearSelectedTagsButton}
                            onClick={() => setSelectedGroupTags([])}
                            disabled={selectedGroupTags.length === 0}
                        >
                            Clear selected filters
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.events}>
                {filteredEvents.map((event: any, index: number) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </Layout>
    );
}

const EVENT_DETAILS_PATH = join(process.cwd(), 'data/events');

export const getStaticProps = async () => {
    const paths = getDirectories(EVENT_DETAILS_PATH);

    const events = paths.map((path: string) => {
        const fullEventPath = join(EVENT_DETAILS_PATH, path, 'details.json');
        const eventData = JSON.parse(
            fs.readFileSync(fullEventPath, { encoding: 'utf8' }),
        );

        return eventData;
    });

    return {
        props: {
            events,
        },
    };
};

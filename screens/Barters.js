import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { db, auth } from "../firebase.conf";
import {
    Text,
    Card,
    Title,
    Subheading,
    Button,
    Searchbar,
} from "react-native-paper";

export default function Barters() {
    const [createdByUser, setCrtdByArr] = useState([]);
    const [interestedInByUser, setIntinArr] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const barterRef = db.collection("trades");
        barterRef
            .where("initiator", "==", auth.currentUser.email)
            .onSnapshot(snapshot => {
                var createByUserArr = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setCrtdByArr(createByUserArr);
            });
        barterRef
            .where("interested", "==", auth.currentUser.email)
            .onSnapshot(snapshot => {
                var interestedArr = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setIntinArr(interestedArr);
            });
    }, []);

    /**
     * This component is rendered for all the barters the user creates.
     */
    const renderComponentForCreatedByUserArray = ({ item }) => (
        <Card>
            <Card.Title title={item.name} subtitle={`For: ${item.object}`} />
            <Card.Content>
                {!item.interested ? (
                    <Text>No one is interested in trading</Text>
                ) : (
                    <Text>{`${item.interested} is interested in your trade`}</Text>
                )}
            </Card.Content>
            <Card.Actions>
                <Button
                    onPress={() => {
                        db.collection("trades").doc(item.id).delete();
                    }}
                >
                    Cancel
                </Button>
            </Card.Actions>
        </Card>
    );

    /**
     * This component is rendered for all the barters the user is
     * interested in and all others
     */
    const renderComponentForInterestedInByUserAndOthers = ({ item }) => {
        console.log(item);
        return (
            <Card>
                <Card.Title
                    title={item.name}
                    subtitle={`For: ${item.object}`}
                />
                <Card.Content>
                    <Text>{item.initiator} has started this trade</Text>
                </Card.Content>
            </Card>
        );
    };

    const ListEmpty = () => <Subheading>This category is empty</Subheading>;
    const SearchListEmpty = () => {
        if (searchQuery === "") {
            return <Subheading>Search for something...</Subheading>;
        } else {
            return <Subheading>No results</Subheading>;
        }
    };

    return (
        <ScrollView>
            <Title>Created By You</Title>
            <FlatList
                data={createdByUser}
                renderItem={renderComponentForCreatedByUserArray}
                keyExtractor={item => item.id}
                ListEmptyComponent={ListEmpty}
            />
            <Title>Trades you are interested in</Title>
            <FlatList
                data={interestedInByUser}
                renderItem={renderComponentForInterestedInByUserAndOthers}
                keyExtractor={item => item.id}
                ListEmptyComponent={ListEmpty}
            />
            <Title>All</Title>
            <Searchbar
                placeholder="Search"
                onChangeText={onSearch}
                value={searchQuery}
            />
            <FlatList
                data={searchResults}
                renderItem={renderComponentForInterestedInByUserAndOthers}
                keyExtractor={item => item.id}
                ListEmptyComponent={SearchListEmpty}
            />
        </ScrollView>
    );
}

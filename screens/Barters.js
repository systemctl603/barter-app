import React, { useEffect, useState } from "react";
import { Alert, FlatList, ScrollView } from "react-native";
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
            .onSnapshot((snapshot) => {
                var createByUserArr = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setCrtdByArr(createByUserArr);
            });
        barterRef
            .where("interested", "==", auth.currentUser.email)
            .onSnapshot((snapshot) => {
                var interestedArr = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setIntinArr(interestedArr);
            });
    }, []);

    const ListEmpty = () => <Subheading>This category is empty</Subheading>;
    const SearchListEmpty = () => {
        if (searchQuery === "") {
            return <Subheading>Search for something...</Subheading>;
        } else {
            return <Subheading>No results</Subheading>;
        }
    };

    const search = (query) => {
        db.collection("trades")
            .where("name", "==", query)
            .get()
            .then((snapshot) => {
                var searchRes = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setSearchResults(searchRes);
            });
    };

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
                {item.fulfillment == 0 && (
                    <Button
                        onPress={() =>
                            db.collection("trades").doc(item.id).delete()
                        }
                    >
                        Delete
                    </Button>
                )}
                {item.interested && (
                    <Button
                        onPressed={() => {
                            db.collection("notifications").add({
                                to: item.interested,
                                from: item.initiator,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                read: false,
                                msg: `${item.initiator} has sent the item.`,
                            });
                            if (item.fulfillment + 1 == 2) {
                                Alert.alert(
                                    "Both parties have sent the item, closing now."
                                );
                                db.collection("notifications").add({
                                    to: item.interested,
                                    from: item.initiator,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    read: false,
                                    msg: `Both parties have sent the item for ${item.name}`,
                                });
                                db.collection("trades").doc(item.id).delete();
                            } else {
                                db.collection("trades").doc(item.id).update({
                                    fulfillment: firebase.firestore.FieldValue.increment(),
                                });
                            }
                        }}
                    >
                        Sent Item
                    </Button>
                )}
            </Card.Actions>
        </Card>
    );

    /**
     * This component is rendered for all the barters the user is
     * interested in
     */
    const renderComponentForInterestedInByUser = ({ item }) => {
        return (
            <Card>
                <Card.Title
                    title={item.name}
                    subtitle={`For: ${item.object}`}
                />
                <Card.Content>
                    <Text>{item.initiator} has started this trade</Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        onPress={() => {
                            db.collection("notifications").add({
                                to: item.interested,
                                from: item.initiator,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                read: false,
                                msg: `${item.initiator} has sent the item.`,
                            });
                            if (item.fulfillment + 1 == 2) {
                                Alert.alert(
                                    "Both parties have sent the item, closing now."
                                );
                                db.collection("notifications").add({
                                    to: item.interested,
                                    from: item.initiator,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    read: false,
                                    msg: `Both parties have sent the item for ${item.name}`,
                                });
                                db.collection("trades").doc(item.id).delete();
                            } else {
                                db.collection("trades").doc(item.id).update({
                                    fulfillment: firebase.firestore.FieldValue.increment(),
                                });
                            }
                        }}
                    >
                        Item Sent
                    </Button>
                </Card.Actions>
            </Card>
        );
    };
    /*
     * This component is the render component for
     * the search results
     */
    function renderComponentForAll({ item }) {
        return (
            <Card>
                <Card.Title
                    title={item.name}
                    subtitle={`For: ${item.object}`}
                />
                <Card.Content>
                    <Text>{item.initiator} has started this trade</Text>
                </Card.Content>
                <Card.Actions>
                    <Button
                        onPress={() => {
                            db.collection("trades").doc(item.id).update({
                                interested: auth.currentUser.email,
                            });
                            db.collection("notifications").add({
                                from: auth.currentUser.email,
                                to: item.initiator,
                                msg: `${auth.currentUser.email} is willing to trade ${item.name} for ${item.name}`,
                                read: false,
                                on: firebase.firestore.FieldValue.serverTimestamp(),
                            });
                        }}
                    >
                        Offer to trade
                    </Button>
                </Card.Actions>
            </Card>
        );
    }

    return (
        <ScrollView>
            <Title>Created By You</Title>
            <FlatList
                data={createdByUser}
                renderItem={renderComponentForCreatedByUserArray}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={ListEmpty}
            />
            <Title>Trades you are interested in</Title>
            <FlatList
                data={interestedInByUser}
                renderItem={renderComponentForInterestedInByUser}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={ListEmpty}
            />
            <Title>All</Title>
            <Searchbar
                placeholder="Search"
                onChangeText={(text) => setSearchQuery(text)}
                onEndEditing={search(searchQuery)}
                value={searchQuery}
            />
            <FlatList
                data={searchResults}
                renderItem={renderComponentForAll}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={SearchListEmpty}
            />
        </ScrollView>
    );
}

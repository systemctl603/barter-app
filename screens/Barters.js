import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { db, auth } from "../firebase.conf";
import { Text, Card, Title, Subheading } from "react-native-paper";

export default function Barters() {
  const [createdByUser, setCrtdByArr] = useState([]);
  const [interestedInByUser, setIntinArr] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  // const [allArr, setAllArr] = useState([]);
  // const [lastLoaded, setLastLoaded] = useState(0);

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

  // async function loadMore() {
  //   setRefreshing(true);
  //   const all = await db
  //     .collection("trades")
  //     .where("interested", "!=", null)
  //     .startAfter(lastLoaded)
  //     .limit(25)
  //     .get();

  //   var nextToLoadFrom = all.docs[all.docs.length - 1];
  //   const allArr = all.docs.reduce((acc, doc) => {
  //     const entry = { id: doc.id, ...doc.data() };
  //     acc.push(entry);
  //   }, []);

  //   setLastLoaded(nextToLoadFrom);
  //   setAllArr((arr) => _.union(arr, allArr));
  //   setRefreshing(false);
  // }

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
      <Web></Web>
    </Card>
  );

  /**
   * This component is rendered for all the barters the user is
   * interested in
   */
  const renderComponentForInterestedInByUser = ({ item }) => {
    console.log(item);
    return (
      <Card>
        <Card.Title title={item.name} subtitle={`For: ${item.object}`} />
        <Card.Content>
          <Text>{item.initiator} has started this trade</Text>
        </Card.Content>
      </Card>
    );
  };

  const ListEmpty = () => <Subheading>This category is empty</Subheading>;

  return (
    <View>
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
    </View>
  );
}

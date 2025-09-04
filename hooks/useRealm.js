// hooks/useRealm.js
import { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import useOutsideClick from "./useOutsideClick";

const useRealm = (ref, searchTerm, database, filter) => {
    const [autoComplete, setAutoComplete] = useState([]);
    const [selectCount, setSelectCount] = useState(0);
    const [selectID, setSelectID] = useState("");
    const [searchPath, setSearchPath] = useState("");

    const addAutoComplete = async () => {
        if (searchTerm.length) {
            const REALM_APP_ID = "widgets_ledger-cliaq";
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            try {
                const user = await app.logIn(credentials);
                const database_details = await user.functions.getDatabaseDetails(database);
                if (database === "non_profit") {
                    const results = await user.functions.searchAutoCompleteWithStates(filter, searchTerm);
                    setAutoComplete(results);
                } else {
                    const results = await user.functions.searchAutoComplete(database_details[0]["autocomplete_path"], searchTerm);
                    setAutoComplete(results);
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            setAutoComplete([]);
        }
    };

    const getAutoCompleteResults = async (id) => {
        const REALM_APP_ID = "widgets_ledger-cliaq";
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        try {
            const user = await app.logIn(credentials);
            const match_query = {}
            match_query[searchPath] = id;
            const results = await user.functions.getAutoCompleteResults(searchPath, match_query);
            setSelectCount(results[0]["totalCount"][0][searchPath]);
            if (results[0]["totalCount"][0][searchPath] === 1) {
                setSelectID(results[0]["results"][0]["_id"])
            }
        } catch (err) {
            console.error(err);
        }
    };

    useOutsideClick(ref, () => {
        setAutoComplete([]);
    });

    useEffect(() => {
        addAutoComplete();
    }, [searchTerm, database, filter]);

    return { autoComplete, selectCount, selectID, getAutoCompleteResults };
};

export default useRealm;
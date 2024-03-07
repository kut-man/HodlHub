# HodlHub
[Link to website](https://hodl-hub.vercel.app/)
![screencapture-hodl-hub-vercel-app-2024-02-28-18_35_41](https://github.com/kut-man/HodlHub/assets/73386100/52fbf84b-2ff0-4545-b600-602825b91fb2)

## SQL Schema
![HoldHubSchema1](https://github.com/kut-man/HodlHub/assets/73386100/5c464902-9edf-41c4-9371-5260be718a3f)



**Authors:** Pedro Torrijos, Pepe Beneyto, and Kutman Eshendukolov

**Date:** March 7, 2024

**Branch Management**

* **`git checkout`**:
    * **Purpose:** Allows you to move between created git branches by branch or look in witch branch are you.
    * **LOOK IN WHICH BRANCH WE ARE:**
        ```bash
        (GIT) C:\Users\Pedro\Desktop\GIT PROYECTO> git checkout

        Your branch is up to date with 'origin/master'.
        ```
    * **CHANGE THE BRANCH:**
        ```bash
        (GIT) C:\Users\Pedro\Desktop\GIT PROYECTO> git checkout test

        Switched to branch 'test'
        Your branch is up to date with 'origin/test'.
        ```
    * **WRONG EXAMPLE OF A BAD MERGE COMMAND:**
        ```bash
        (Git_Bi) C:\Users\PC-PEPE\Documents\BI_Pedro\GIT-PROYECTO>git merge origin --> thats not the good way to make it
        ```

* **`git merge`**:
    * **Purpose:** Combine multiple secuencies of commits into one unified history.
    * **MERGE THE INFORMATION OF MASTER BRANCH IN TO TEST BRANCH:**
        ```bash
        (GIT) C:\Users\Pedro\Desktop\GIT PROYECTO> git merge origin/master

        Updating bac0634..103f99b
        Fast-forward
        definitions.txt | 18 ++++++++----------
        prueba.html      | 11 +++++++++++
        2 files changed, 19 insertions(+), 10 deletions(-)
        ```


* **`git push`**:
    * **Purpose:** Uploading local repository content to a remote repository
    * **UPDATING THE CHANGES THAT HAVES MAKE PEPE IN TO THE GITHUB REPOSITORY:**
        ```bash
        (Git_Bi) C:\Users\PC-PEPE\Documents\BI_Pedro\GIT-PROYECTO>git push
        Enumerating objects: 5, done.
        Counting objects: 100% (5/5), done.
        Delta compression using up to 4 threads
        Compressing objects: 100% (3/3), done.
        Writing objects: 100% (3/3), 640 bytes | 213.00 KiB/s, done.
        Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
        remote: Resolving deltas: 100% (1/1), completed with 1 local object.
        To https://github.com/Pedro97198/GIT-PROYECTO
        bac0634..465e74e  test -> test
        ```
* **`git fetch`**:
    * **Purpose:** Downloads commits, refs and files from a remote repository into your locoal repo.
    * **Example:**
        ```bash
          (GIT) C:\Users\Pedro\Desktop\GIT PROYECTO>git fetch 
          remote: Enumerating objects: 5, done.
          remote: Counting objects: 100% (5/5), done.
          remote: Compressing objects: 100% (2/2), done.
          remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
          Unpacking objects: 100% (3/3), 383 bytes | 54.00 KiB/s, done.
          From https://github.com/Pedro97198/GIT-PROYECTO
          bac0634..103f99b  master     -> origin/master
        ```
* **`git pull`**:
    * **Purpose:** It downloads content from a repository and immediately update the local repository to match that content.
    * **DOWNLOADING THE INFORMATION OF THE REPOSITORY OF GITHUB TO MY LOCAL REPOSITORY:**
        ```bash
        (GIT) C:\Users\Pedro\Desktop\GIT PROYECTO>git pull
        remote: Enumerating objects: 5, done.
        remote: Counting objects: 100% (5/5), done.
        remote: Compressing objects: 100% (2/2), done.
        remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0
        Unpacking objects: 100% (3/3), 620 bytes | 56.00 KiB/s, done.
        From https://github.com/Pedro97198/GIT-PROYECTO
        * [new branch]      test       -> origin/test
        Already up to date.
        ```

* **`git fetch`+`git merge` vs `git pull`**: Git pull copies changes from a remote repository directly into your working directory, while git fetch does not.

* **`git stash`**: The changes are temporarily removed from the files and you can choose to restore or discard the changes later.
    not done yet
* **`git rebase`**: Allows you to easily change a series of commits, modifying the history of your repository.
    not done yet

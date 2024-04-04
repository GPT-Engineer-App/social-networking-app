import { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, Image, Avatar, IconButton, Menu, MenuButton, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, useToast } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaQuoteLeft, FaUserPlus, FaEnvelope, FaUsers, FaCog } from "react-icons/fa";

// ダミーデータ
const users = [
  { id: 1, name: "山田太郎", email: "yamada@example.com", password: "password" },
  { id: 2, name: "鈴木花子", email: "suzuki@example.com", password: "password" },
];

const communities = [
  { id: 1, name: "初心者歓迎コミュニティ", description: "プログラミング初心者のためのコミュニティです。", memberLimit: 100, isWelcomingBeginners: true },
  { id: 2, name: "Webデザインコミュニティ", description: "Webデザインについて語り合うコミュニティです。", memberLimit: 50, isWelcomingBeginners: false },
];

const posts = [
  { id: 1, userId: 1, communityId: 1, content: "はじめまして！プログラミング初心者です。よろしくお願いします。", likes: 5, bads: 0 },
  { id: 2, userId: 2, communityId: 2, content: "新しいWebデザインのトレンドについて教えてください！", likes: 3, bads: 1 },
];

const Index = () => {
  const [user, setUser] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure();
  const { isOpen: isPostOpen, onOpen: onPostOpen, onClose: onPostClose } = useDisclosure();
  const toast = useToast();

  // ログイン処理
  const handleLogin = (email, password) => {
    const loggedInUser = users.find((u) => u.email === email && u.password === password);
    if (loggedInUser) {
      setUser(loggedInUser);
      onLoginClose();
      toast({ title: "ログインしました", status: "success", duration: 3000, isClosable: true });
    } else {
      toast({ title: "メールアドレスまたはパスワードが間違っています", status: "error", duration: 3000, isClosable: true });
    }
  };

  // 登録処理
  const handleRegister = (name, email, password) => {
    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);
    setUser(newUser);
    onRegisterClose();
    toast({ title: "登録が完了しました", status: "success", duration: 3000, isClosable: true });
  };

  // ログアウト処理
  const handleLogout = () => {
    setUser(null);
    setSelectedCommunity(null);
    toast({ title: "ログアウトしました", status: "success", duration: 3000, isClosable: true });
  };

  // 投稿処理
  const handlePost = (content) => {
    const newPost = { id: posts.length + 1, userId: user.id, communityId: selectedCommunity.id, content, likes: 0, bads: 0 };
    posts.push(newPost);
    onPostClose();
    toast({ title: "投稿しました", status: "success", duration: 3000, isClosable: true });
  };

  // いいね処理
  const handleLike = (postId) => {
    const post = posts.find((p) => p.id === postId);
    post.likes++;
  };

  // バッド処理
  const handleBad = (postId) => {
    const post = posts.find((p) => p.id === postId);
    post.bads++;
  };

  // コミュニティ選択処理
  const handleSelectCommunity = (community) => {
    setSelectedCommunity(community);
  };

  // おすすめコミュニティ取得処理
  const getRecommendedCommunities = () => {
    // ここでは単純にすべてのコミュニティを返していますが、実際にはユーザーのプロフィールをもとにおすすめのコミュニティを選択する処理を実装します。
    return communities;
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" bg="gray.100" p={4}>
        <Heading size="lg">SNSアプリ</Heading>
        {user ? (
          <Flex align="center">
            <Avatar name={user.name} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyfGVufDB8fHx8MTcxMjIwNTI0NXww&ixlib=rb-4.0.3&q=80&w=1080" mr={2} />
            <Text>{user.name}</Text>
            <Button onClick={handleLogout} ml={4}>
              ログアウト
            </Button>
          </Flex>
        ) : (
          <Flex>
            <Button onClick={onLoginOpen} mr={2}>
              ログイン
            </Button>
            <Button onClick={onRegisterOpen}>登録</Button>
          </Flex>
        )}
      </Flex>

      {user && (
        <Flex>
          <Box w="20%" bg="gray.200" p={4}>
            <Heading size="md" mb={4}>
              コミュニティ
            </Heading>
            {communities.map((community) => (
              <Box key={community.id} p={2} mb={2} bg={community.id === selectedCommunity?.id ? "blue.100" : "white"} borderRadius="md" cursor="pointer" onClick={() => handleSelectCommunity(community)}>
                {community.name}
              </Box>
            ))}
          </Box>

          <Box flex={1} p={4}>
            {selectedCommunity ? (
              <>
                <Flex justify="space-between" mb={4}>
                  <Heading size="lg">{selectedCommunity.name}</Heading>
                  <Button leftIcon={<FaEnvelope />}>メッセージ</Button>
                </Flex>
                <Box mb={8}>
                  <Text>{selectedCommunity.description}</Text>
                  <Text>
                    メンバー数: {selectedCommunity.memberLimit}人 (初心者歓迎
                    {selectedCommunity.isWelcomingBeginners ? "可" : "不可"})
                  </Text>
                </Box>

                <Flex justify="space-between" mb={4}>
                  <Heading size="md">投稿一覧</Heading>
                  <Button onClick={onPostOpen}>新規投稿</Button>
                </Flex>
                {posts
                  .filter((post) => post.communityId === selectedCommunity.id)
                  .map((post) => (
                    <Box key={post.id} bg="gray.100" p={4} mb={4} borderRadius="md">
                      <Flex align="center" mb={2}>
                        <Avatar name={users.find((user) => user.id === post.userId).name} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHx1c2VyJTIwYXZhdGFyfGVufDB8fHx8MTcxMjIwNTI0NXww&ixlib=rb-4.0.3&q=80&w=1080" mr={2} size="sm" />
                        <Text>{users.find((user) => user.id === post.userId).name}</Text>
                      </Flex>
                      <Text>{post.content}</Text>
                      <Flex mt={2}>
                        <IconButton icon={<FaThumbsUp />} variant="ghost" onClick={() => handleLike(post.id)} mr={2} />
                        {post.likes}
                        <IconButton icon={<FaThumbsDown />} variant="ghost" onClick={() => handleBad(post.id)} mr={2} ml={4} />
                        {post.bads}
                        <IconButton icon={<FaQuoteLeft />} variant="ghost" ml="auto" />
                      </Flex>
                    </Box>
                  ))}
              </>
            ) : (
              <Box textAlign="center">
                <Heading size="lg" mb={8}>
                  コミュニティを選択してください
                </Heading>
                <Image src="https://images.unsplash.com/photo-1671366659559-1a6cf62d8e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBpbGx1c3RyYXRpb258ZW58MHx8fHwxNzEyMjA2NDc3fDA&ixlib=rb-4.0.3&q=80&w=1080" maxW="400px" mx="auto" mb={8} />

                <Heading size="md" mb={4}>
                  おすすめコミュニティ
                </Heading>
                <Flex justify="center">
                  {getRecommendedCommunities().map((community) => (
                    <Box key={community.id} p={4} mr={4} bg="white" borderRadius="md" cursor="pointer" onClick={() => handleSelectCommunity(community)}>
                      <Heading size="sm">{community.name}</Heading>
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      )}

      <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ログイン</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="メールアドレス" mb={4} />
            <Input placeholder="パスワード" type="password" mb={4} />
            <Button colorScheme="blue" onClick={() => handleLogin("yamada@example.com", "password")}>
              ログイン
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="名前" mb={4} />
            <Input placeholder="メールアドレス" mb={4} />
            <Input placeholder="パスワード" type="password" mb={4} />
            <Button colorScheme="blue" onClick={() => handleRegister("田中太郎", "tanaka@example.com", "password")}>
              登録
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isPostOpen} onClose={onPostClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規投稿</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="投稿内容" mb={4} />
            <Button colorScheme="blue" onClick={() => handlePost("新しい投稿です。")}>
              投稿
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;

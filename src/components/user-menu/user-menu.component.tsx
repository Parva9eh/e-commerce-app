'use client';

import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CurrentUser } from '@/store/user/user.types';
import { signOutStart } from '@/store/user/user.action';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { getUserInitial, getUserLabel } from '@/utils/user/user-display.utils';
import {
  SignOutButton,
  UserAvatar,
  UserGreeting,
  UserMenuContainer,
  UserMenuDropdown,
  UserMenuEmail,
  UserMenuTrigger,
  UserStatus,
  UserSummary,
} from './user-menu.styles';

type UserMenuProps = {
  currentUser: CurrentUser;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const userLabel = getUserLabel(currentUser);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  const handleSignOut = () => {
    setIsOpen(false);
    dispatch(signOutStart());
  };

  return (
    <UserMenuContainer ref={menuRef}>
      <UserMenuTrigger
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Account menu for ${userLabel}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <UserAvatar aria-hidden="true">{getUserInitial(currentUser)}</UserAvatar>
        <UserSummary>
          <UserGreeting>Hi, {userLabel}</UserGreeting>
          <UserStatus>Signed in</UserStatus>
        </UserSummary>
      </UserMenuTrigger>

      {isOpen && (
        <UserMenuDropdown role="menu">
          {currentUser.email && <UserMenuEmail>{currentUser.email}</UserMenuEmail>}
          <SignOutButton type="button" role="menuitem" onClick={handleSignOut}>
            Sign out
          </SignOutButton>
        </UserMenuDropdown>
      )}
    </UserMenuContainer>
  );
};

export default UserMenu;
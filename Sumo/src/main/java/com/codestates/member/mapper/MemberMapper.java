package com.codestates.member.mapper;

import com.codestates.member.dto.MemberDto;
import com.codestates.member.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
    public Member memberPostDtoToMember(MemberDto.Post postDto){
        if (postDto == null){
            return null;
        }
        else {
            Member member = new Member();
            member.setEmail(postDto.getEmail());
            member.setNickname(postDto.getNickname());
            member.setPassword(postDto.getPassword());
            return member;
        }
    }

    public Member memberPatchDtoToMember(MemberDto.Patch patchDto){
        if (patchDto == null){
            return null;
        } else {
            Member member = new Member();
            member.setMemberId(patchDto.getMemberId());
            member.setNickname(patchDto.getNickname());
            member.setEmail(patchDto.getEmail());
        }
    }

    public MemberDto.Response memberToMemberResponseDto(Member member){
        if(member == null){
            return null;
        } else {
            long memberId = 0L;
            String email = null;
            String nickname = null;
            memberId = member.getMemberId();
            email = member.getEmail();
            nickname = member.getNickname();
            MemberDto.Response response = new MemberDto.Response(memberId,email,nickname);
            return response;
        }
    }
}

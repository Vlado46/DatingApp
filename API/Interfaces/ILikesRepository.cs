using System;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<MemberLike?> GetMemberLike(string sourceMemberId, string targetMemberId);
    Task<PaginatedResult<Member>> GetMemberLikes(LikesParams likesParams);
    Task<IReadOnlyList<string>> GetCurrentMemberLikeIds(string memberId);
    void AddLike(MemberLike like);
    void DeleteLike(MemberLike like);
    Task<bool> SaveAllChanges();
}
